package demo;

public class User {
	private int shopID;
	private String name;
	private String pass;
	private int isAdmin;
	
	public User() {
	}
	public User(int shopID, String name, String pass, int isAdmin) {
		this.shopID=shopID;
		this.name=name;
		this.pass=pass;
		this.isAdmin=isAdmin;
	}
	public int getShop() {
		return shopID;
	}
	public String getName() {
		return name;
	}
	public String getPass() {
		return pass;
	}
	
	public int getIsAdmin() {
		return isAdmin;
	}
}
