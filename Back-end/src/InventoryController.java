package demo;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import java.sql.*;
import java.util.*;


@RestController

@RequestMapping("/api")
public class InventoryController {
	
	//error notification for failed auth
	List<HashMap> error(sql s){
		HashMap<String, String> map = new HashMap<String, String>();
		List<HashMap> ab = new ArrayList<HashMap>();
		map.put("error", "Authentication failed");
		ab.add(map);
		s.closeConnection();
		return ab;
	}
	
	//login
	@CrossOrigin
	@PostMapping("/auth")
	public @ResponseBody HashMap<String, String> create(@RequestBody String json) {
		sql s = new sql();
		HashMap<String, String> map = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String, String> json_map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
			String n = json_map.get("name");
			String p = json_map.get("pass");
			s.Login(n, p, map);
			s.closeConnection();
			return map;
		}
		catch(Exception e) {
			return null;
		}
	}
	
	//get all product
	@CrossOrigin
	@GetMapping("/product")
	public List<?> getInventory(@RequestParam(value="token", defaultValue="1") String tok) {
		sql s = new sql();
		List<Product> al = new ArrayList<Product>();
		if (s.tokenNotExist(tok)) {
			return error(s);
		}
		else {
			s.listProduct(al);
			s.closeConnection();
			return al;
		}
	}
	
	//get transaction
	@CrossOrigin
	@GetMapping("/transaction")
	public List<?> getTransaction(@RequestParam(value="token", defaultValue="1") String tok) {
		sql s = new sql();
		List<Transaction> al = new ArrayList<Transaction>();
		if (s.tokenNotExist(tok)) {
			return error(s);
		}
		else {
			s.listTransaction(al, tok);
			s.closeConnection();
			return al;
		}
		
	}
	
	//create new user
	@CrossOrigin
	@PostMapping("/user")
	public @ResponseBody HashMap<String, String> createUser(@RequestBody String json,
			@RequestParam(value="token", defaultValue="1") String tok) {
		sql s = new sql();
		HashMap<String, String> map = new HashMap<String, String>();
		if (s.tokenNotExist(tok) || s.isTokenAd(tok)==0) {
			map.put("error", "Authentication failed");
		}
		else if (s.isTokenAd(tok)==1) {
			
			ObjectMapper mapper = new ObjectMapper();
			try {
				Map<String, String> json_map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
				String n = json_map.get("name");
				String p = json_map.get("pass");
				System.out.println(n);
				System.out.println(p);
				if (s.createU(n, p)) {
					map.put("success", "Create user successful");
				}
				else {
					map.put("error", "Create user failed");
				}
			}
			catch(Exception e) {
				return null;
			}
		}
		s.closeConnection();
		return map;
	}
	
	//view list of user
	@CrossOrigin
	@GetMapping("/user")
	public List<?> getUser(@RequestParam(value="token", defaultValue="1") String tok) {
		sql s = new sql();
		List<User> al = new ArrayList<User>();
		if (s.tokenNotExist(tok) || s.isTokenAd(tok)==0) {
			return error(s);
		}
		else if (s.isTokenAd(tok)==1) {
			s.listUser(al);
			s.closeConnection();
		}
		return al;
	}
	
	//logout
		@CrossOrigin
		@GetMapping("/logout")
		public HashMap<String, String> logOut(@RequestParam(value="token", defaultValue="1") String tok) {
			sql s = new sql();
			s.delToken(tok);
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("success", "logout successfully");
			return map;
		}


	
	@CrossOrigin
	@PutMapping("/user/{shopID}")
	public Map<String, String> updateUser ( @PathVariable("shopID") String shopID,
											@RequestParam("token") String token,
											@RequestBody String json) {
		ObjectMapper mapper = new ObjectMapper();
		sql s = new sql();
		HashMap<String, String> map = new HashMap<String, String>();
		
		if (s.verifyAdminToken(token)) {
			try {
				Map<String, String> json_map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
				s.executeUpdateUser(json_map.get("name"), json_map.get("pass"), shopID);
				s.closeConnection();
				map.put("success", "Change user successfuly");
				return map;
			} catch (Exception e) {
				System.out.println(e.getMessage());
				s.closeConnection();
				map.put("error", "Change user failed");
				return map;
			}
		} else {
			s.closeConnection();
			map.put("error", "Change user failed");
			return map;
		}
		
	}
	/*---------------------------8-----------------------------*/
	
	
	
	
	/*---------------------------9-----------------------------*/
	@CrossOrigin
	@PostMapping("/product")
	public Map<String, String> createProduct (@RequestParam("token") String token,
											  @RequestBody String json) {
		
		ObjectMapper mapper = new ObjectMapper();
		sql s = new sql();
		HashMap<String, String> map = new HashMap<String, String>();
		
		if (s.verifyAdminToken(token)) {
			
			try {
				Map<String, String> json_map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
				if (s.executeCreateProduct(json_map.get("code"), json_map.get("name"))) {
					
					s.closeConnection();
					map.put("success", "Create product successfuly");
					return map;
				} else {
					s.closeConnection();
					map.put("error", "Create product failed");
					return map;
				}
					
			} catch (Exception e) {
				System.out.println(e.getMessage());
				s.closeConnection();
				map.put("error", "Create product failed");
				return map;
			}
		} else {
			s.closeConnection();
			map.put("error", "Create product failed");
			return map;
		}
	}
		
		
	@CrossOrigin
		@DeleteMapping("/product/{code}")
		public Map<String, String> deleteProduct (@RequestParam("token") String token,
												  @PathVariable("code") String code) {
			//ObjectMapper mapper = new ObjectMapper();
			sql s = new sql();
			HashMap<String, String> map = new HashMap<String, String>();
			if (s.verifyAdminToken(token)) {
				// if code exists => delete it => success
				// else error
				if (s.executeDeleteProduct(code)) {
					s.closeConnection();
					map.put("success", "Delete product successfuly");
					return map;
				} else {
					s.closeConnection();
					map.put("error", "Delete product failed");
					return map;
				}
			} else {
				s.closeConnection();
				map.put("error", "Delete product failed");
				return map;
			}

	}
		
		
	@CrossOrigin
		@PostMapping("/transaction")
		public Map<String, String> transaction (@RequestParam("token") String token,
												@RequestBody String json) {
			sql s = new sql();
			HashMap<String, String> map = new HashMap<String, String>();
			if (s.tokenNotExist(token)) {
				map.put("error", "Transaction failed");
				s.closeConnection();
				return map;
			} else {
				ObjectMapper mapper = new ObjectMapper();
				try {
					Map<String, String> json_map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
					s.executeTransaction(json_map.get("type"),
										 Integer.parseInt(json_map.get("qty")),
										 json_map.get("code"),
										 Integer.parseInt(json_map.get("shopID")));
					map.put("success", "Transaction finished");
					s.closeConnection();
					return map;
				} catch (Exception e) {
					map.put("error", "Transaction failed");
					s.closeConnection();
					return map;
				}
			}
		}
}
