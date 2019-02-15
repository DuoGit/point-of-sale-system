package demo;

public class Transaction {
	private int transID;
	private String code;
	private String date;
	private String type;
	private int qty;
	private int shopID;
	
	public Transaction() {
	}
	public Transaction(int transID, String code, String date, String type,
						int qty, int shopID) {
		this.transID=transID;
		this.code=code;
		this.date=date;
		this.type=type;
		this.qty=qty;
		this.shopID=shopID;
	}
	public int getTransID() {
		return transID;
	}
	public String getCode() {
		return code;
	}
	public String getDate() {
		return date;
	}
	public String getType() {
		return type;
	}
	public int getQty() {
		return qty;
	}
	public int getShopID() {
		return shopID;
	}
}

