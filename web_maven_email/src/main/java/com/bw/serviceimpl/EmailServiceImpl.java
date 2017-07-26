package com.bw.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bw.mapper.EmailMapper;
import com.bw.pojo.SendEmail;
import com.bw.service.EmailService;
@Service
@Transactional
public class EmailServiceImpl implements EmailService{
	@Autowired
	private EmailMapper em;
	@Override
	public List<SendEmail> getAllInfo() {
		List<SendEmail> allInfo = em.getAllInfo();
		return allInfo;
	}

	@Override
	public void batchDel(String ids) {
		em.batchDel(ids);
		
	}

	@Override
	public List<SendEmail> selectByStatus(int status) {
		List<SendEmail> list = em.selectByStatus(status);
		return list;
	}

}
