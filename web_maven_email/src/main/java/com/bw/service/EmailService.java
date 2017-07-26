package com.bw.service;

import java.util.List;

import com.bw.pojo.SendEmail;

public interface EmailService {
	public List<SendEmail> getAllInfo();
	public void batchDel(String ids);
	public List<SendEmail> selectByStatus(int status);
}
