package com.bw.mapper;

import java.util.List;

import com.bw.pojo.SendEmail;

public interface EmailMapper {
	public List<SendEmail> getAllInfo();
	public void batchDel(String ids);
	public List<SendEmail> selectByStatus(int status);
}
