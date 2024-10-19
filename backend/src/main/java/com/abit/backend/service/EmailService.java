package com.abit.backend.service;

import com.abit.backend.database.repository.EmailRepository;
import com.abit.backend.entity.UserEmail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailRepository repository;

    @Transactional
    public UserEmail createEmail(UserEmail email) {
        sendMail(email.getEmail(), "Success authorize.", "Thanks for registry❤️;3");
        return repository.save(email);
    }

    public void sendMail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public UserEmail findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void sendHtmlMail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);  // true для включения HTML

        mailSender.send(mimeMessage);
    }
}