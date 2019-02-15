package demo;
import java.sql.*;
import java.util.*;

public class sql {
	Connection c = null;
	Statement stmt = null;
		
	public sql(){
		try {
			Class.forName("org.sqlite.JDBC");
			c = DriverManager.getConnection("jdbc:sqlite:mls");
			System.out.println("Connected to DB OK!");
			c.isClosed();
		}catch(Exception e) {
			System.out.println("Error: " + e.getMessage());
		}
	}
	
	//login
	public void Login(String name, String pass, HashMap<String, String> map) {
		boolean i = loginFailed(name, pass);
		if (i) {
			map.put("error", "Login Unsuccessful");
		}
		else {
		try {
			randomToken(name);
			this.stmt = c.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * from User where name=\"" 
											+ name + "\" AND pass=\"" + pass +"\"");
			while (rs.next()){
				String token = rs.getString("token");
				int isAd = rs.getInt("isAdmin");
				String si = rs.getInt("shopID") + "";
				if (isAd==1) {
					map.put("role", "admin");
				}
				else if (isAd==0) {
					map.put("role", "cashier");
					map.put("shopID", si);
				}
				map.put("token", token);
			}
		}
		catch(Exception e) {
			System.out.println("Error: " + e.getMessage());
		}	
		}
	}
	
	//check if login failed
	boolean loginFailed(String name, String pass) {
		try {
			this.stmt = c.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * from User where name=\"" 
					+ name + "\" AND pass=\"" + pass +"\"");
			String str = rs.getString("name");
			String str2 = rs.getString("pass");
			return false;
		} catch (Exception e) {
			return true;
		}
	}
	
	public void closeConnection() {
		try {
			c.close();
		} catch(Exception e) {
			
		}
	}
	
	//random token for a user
	void randomToken(String name) {
		Ran ran = new Ran();
		try {
			this.stmt = c.createStatement();
			String query="UPDATE User SET token=\"" + ran.getRan() +"\" WHERE name=\"" + name + "\"";
			ResultSet rs = stmt.executeQuery(query);
		}catch(Exception e) {
			
		}
		
	}
	
	//check if token not exist
	public boolean tokenNotExist(String token) {
		try {
			this.stmt = c.createStatement();
			String query="SELECT * FROM User WHERE token=\"" 
					+ token + "\"";
			ResultSet rs = stmt.executeQuery(query);
			String str = rs.getString("token");
			return false;
		}catch (Exception e) {
			return true;
		}
	}
	
	//check if token belongs to admin
	public int isTokenAd(String token) {
		try {
			this.stmt = c.createStatement();
			String query="SELECT * FROM User WHERE token=\"" 
					+ token + "\"";
			ResultSet rs = stmt.executeQuery(query);
			int ad = rs.getInt("isAdmin");
			return ad;
		}catch (Exception e) {
			return -1;
		}
	}
	
	//show product
	public void listProduct(List<Product> al) {
		try {
			this.stmt = c.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM Product");
			
			while(rs.next()) {
				String code = rs.getString("code");
				String name = rs.getString("name");
				al.add(new Product(code, name));
				System.out.println(code+"\t"+name);
			}
		} catch(Exception e ) {
			System.out.println("Error: " + e.getMessage());
		}
	}
	
	//show transaction
		public void listTransaction(List<Transaction> al, String token) {
			try {
				this.stmt = c.createStatement();
				ResultSet rs = null;
				if (isTokenAd(token)==1) {
				rs = stmt.executeQuery("SELECT * FROM [Transaction]");
				}
				else if (isTokenAd(token)==0) {
					int s=TokenBelong(token);
					rs = stmt.executeQuery("SELECT * FROM [Transaction] WHERE shopID=\"" + s + "\"");
				}
				while(rs.next()) {
					int transID = rs.getInt("transID");
					String code = rs.getString("code");
					String date = rs.getString("date");
					String type = rs.getString("type");
					int qty = rs.getInt("qty");
					int shopID = rs.getInt("shopID");
					al.add(new Transaction(transID, code, date, type, qty, shopID));
				}
			} catch(Exception e ) {
				System.out.println("Error: " + e.getMessage());
			}
		}
		
		//check whose token belongs to
		public int TokenBelong(String token) {
			try {
				this.stmt = c.createStatement();
				String query="SELECT * FROM User WHERE token=\"" 
						+ token + "\"";
				ResultSet rs = stmt.executeQuery(query);
				int s = rs.getInt("shopID");
				return s;
			}catch (Exception e) {
				return -1;
			}
		}
		
		//create user
		public boolean createU(String name, String pass) {
			try {
				boolean i=userNotDup(name);
				if (i) {
					this.stmt = c.createStatement();
					String query="INSERT INTO User (name, pass, isAdmin)"
							+ " VALUES (\"" + name + "\", \"" + pass + "\", \"0\")";
					int rs = stmt.executeUpdate(query);
					return true;
				}
				else {
					System.out.print("duplicated");
					return false;
				}
			}
				catch (Exception e){
					System.out.print("Error: " + e.getMessage());
					return false;
				}
				
			}
	
		//check if username is duplicated
		public boolean userNotDup(String name) {
			try {
				this.stmt = c.createStatement();
				String query="SELECT * FROM User WHERE name=\"" 
						+ name + "\"";
				ResultSet rs = stmt.executeQuery(query);
				String str = rs.getString("name");
				return false;
			}catch (Exception e) {
				return true;
			}
		}
		
		//show users
		public void listUser(List<User> al) {
			try {
				this.stmt = c.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM User");
				
				while(rs.next()) {
					int shopID = rs.getInt("shopID");
					String name = rs.getString("name");
					String pass = rs.getString("pass");
					int isAdmin = rs.getInt("isAdmin");
					al.add(new User(shopID, name, pass, isAdmin));
				}
			} catch(Exception e ) {
				System.out.println("Error: " + e.getMessage());
			}
		}
		

		//logout
		public void delToken(String token) {
			try {
				this.stmt = c.createStatement();
				String nothing = "";
				String query="UPDATE User SET token=\"" + nothing +"\" WHERE token=\"" + token + "\"";
				int rs = stmt.executeUpdate(query);
			} catch(Exception e ) {
				System.out.println("Error: " + e.getMessage());
			}
		}

		




		// check if received token belongs to admin's token in User table
		public boolean verifyAdminToken (String token) {
			try {
				this.stmt = c.createStatement();
				String query = "SELECT shopID FROM User WHERE token=\"";
					   query += token;
					   query += "\"";
					   
				ResultSet rs = stmt.executeQuery(query);
				
				int zero = rs.getInt("shopID");
				if (zero == 0) {
					return true;
				}else {
					return false;
				}
				
			} catch (Exception e) {
				System.out.println(e.getMessage());
				return false;
			}
			
		
		}
		
		// execute updateUser
		public void executeUpdateUser(String name, String pass, String shopID) {
			try {
				this.stmt = c.createStatement();
				String  query = "UPDATE User SET name=\"";
						query += name+ "\", pass=\"" +pass+ "\"";
						query += " WHERE shopID=\"" +shopID+ "\"";
						ResultSet rs = stmt.executeQuery(query);
			}catch(Exception e) {
				System.out.println(e.getMessage());
			}
			
		}
		
		
		// execute updateProduct
		public boolean executeCreateProduct(String code, String name) {
			try {
				this.stmt = c.createStatement();
				String query = "SELECT code FROM Product WHERE code=\"" +code+ "\"";
				
				ResultSet rs = stmt.executeQuery(query);
				
				String c = rs.getString("code");

				return false;
				
			}catch(Exception e) {
				try {
					this.stmt = c.createStatement();
					String query = "INSERT INTO Product VALUES (\"" +code+ "\", \"" +name+ "\")";
					stmt.executeUpdate(query);
					if (code.equals(null)){
						return false;
					}
					else {
						return true;
					}
				} catch (Exception e2) {
					System.out.println(e.getMessage());
					return false;
				}
				
			}
			
		}
		
		// execute deleteProduct
		public boolean executeDeleteProduct(String code) {
			try {
				this.stmt = c.createStatement();
				String query = "SELECT code FROM Product WHERE code=\"" +code+ "\"";
				
				ResultSet rs = stmt.executeQuery(query);
				
				String c = rs.getString("code");

				
				query = "DELETE FROM Product WHERE code=\"" +code+ "\"";
				stmt.executeUpdate(query);
				return true;
				
			}catch(Exception e) {
				
					System.out.println(e.getMessage());
					return false;
				
				
			}
		}
		
		
		public void executeTransaction(String type, Integer qty, String code, Integer shopID) {
			String query = "INSERT INTO \"Transaction\" (date,type,qty,code,shopID)"
					+ " VALUES (date('now', 'localtime'), ";
					query += "\"" +type+ "\", ";
					query += qty+ ", ";
					query += "\"" +code+ "\", ";
					query += shopID+ ")";
					
					try {
						System.out.println(query);
						this.stmt = c.createStatement();
						stmt.executeUpdate(query);
					} catch (Exception e) {
						System.out.println(e.getMessage());
					}
					
		}

	}


