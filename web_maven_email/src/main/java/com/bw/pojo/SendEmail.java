package com.bw.pojo;

import java.util.Date;

public class SendEmail {
	private int id;
	private String person;
	private int status;
	private String title;
	private Date sendtime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPerson() {
		return person;
	}
	public void setPerson(String person) {
		this.person = person;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getSendtime() {
		return sendtime;
	}
	public void setSendtime(Date sendtime) {
		this.sendtime = sendtime;
	}
	public SendEmail() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SendEmail(int id, String person, int status, String title,
			Date sendtime) {
		super();
		this.id = id;
		this.person = person;
		this.status = status;
		this.title = title;
		this.sendtime = sendtime;
	}
	@Override
	public String toString() {
		return "SendEmail [id=" + id + ", person=" + person + ", status="
				+ status + ", title=" + title + ", sendtime=" + sendtime + "]";
	}
	
}
