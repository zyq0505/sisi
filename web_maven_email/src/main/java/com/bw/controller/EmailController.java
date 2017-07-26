package com.bw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bw.pojo.SendEmail;
import com.bw.service.EmailService;

@Controller
public class EmailController {
	@Autowired
	private EmailService es;
	@RequestMapping("all")
	public String getall(Model model){
		List<SendEmail> allInfo = es.getAllInfo();
		model.addAttribute(allInfo);
		return "index";
	}
}
