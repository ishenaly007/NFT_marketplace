package com.abit.backend.http.controller;

import com.abit.backend.entity.EmailRequest;
import com.abit.backend.entity.UserEmail;
import com.abit.backend.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/emails")
@CrossOrigin(origins = "http://localhost:5173")
public class EmailRestController {
    private final EmailService emailService;

    @PreAuthorize("permitAll()")
    @PostMapping("/{id}/sendMail")
    public void sendMail(@PathVariable("id") Integer id, @RequestBody EmailRequest emailRequest) {
        UserEmail email = emailService.findById(id);
        emailService.sendMail(email.getEmail(), emailRequest.getSubject(), emailRequest.getText());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    public UserEmail createEmail(@RequestBody UserEmail userEmail) {
        return emailService.createEmail(userEmail);
    }

    @PostMapping("/{id}/sendHtmlMail")
    public ResponseEntity<String> sendHtmlMailToUser(@PathVariable("id") Integer id, @RequestBody EmailRequest emailRequest) {
        try {
            String htmlContent = "<html>" +
                                 "<body style='font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;'>" +
                                 "<table style='width: 100%; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);'>" +
                                 "    <tr>" +
                                 "        <td style='text-align: center;'>" +
//                                 "            <img src='' alt='Logo' style='width: 150px; margin-bottom: 20px;'/>" +
                                 "            <h1 style='color: #333333;'>Welcome to Our Service!</h1>" +
                                 "        </td>" +
                                 "    </tr>" +
                                 "    <tr>" +
                                 "        <td style='padding: 20px; color: #555555; text-align: center;'>" +
                                 "            <p style='font-size: 18px;'>" + emailRequest.getText() + "</p>" +
                                 "            <a href='#' style='display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;'>Click Here</a>" +
                                 "        </td>" +
                                 "    </tr>" +
                                 "    <tr>" +
                                 "        <td style='text-align: center; padding-top: 20px; color: #999999; font-size: 12px;'>" +
                                 "            <p>If you didn't request this, please ignore this email.</p>" +
                                 "        </td>" +
                                 "    </tr>" +
                                 "</table>" +
                                 "</body>" +
                                 "</html>";

            emailService.sendHtmlMail(emailService.findById(id).getEmail(), emailRequest.getSubject(), htmlContent);
            return ResponseEntity.ok("HTML email sent to " + emailRequest.getTo());
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }
    }
}