<?php

require_once('PHPMailerAutoload.php');
//function sendEmail($name,$email,$website,$phone){
  $mail = new PHPMailer();
  $mail->SMTPDebug =2;

$name="Dharshan";
$email="charshans@gmail.com";
$subject="Lets";
$message="Docks";


  // More headers
  $headers = 'From: '.$name.' <'.$email.'>'. "\r\n";
   //Ask for HTML-friendly debug output
  $mail->Debugoutput = 'html';
  //Set the hostname of the mail server
  $mail->Host = "25";
  //Set the SMTP port number - likely to be 25, 465 or 587
 // $mail->Port = 465;
  //Whether to use SMTP authentication
  $mail->SMTPAuth = true;
  //Username to use for SMTP authentication
  $mail->Username = "cdharshans@gmail.com";
  //Password to use for SMTP authentication
  $mail->Password = "saraspathy@123";
  //Set who the message is to be sent from
 //$mail->setFrom('no-reply@jsvilla.com', 'jsvilla');
 $mail->setFrom('no-reply@jsvilla.com', "SARA TRAVELS");
  //Set an alternative reply-to address
  //$mail->addReplyTo($from_mail, $from_name);
  //Set who the message is to be sent to
  $mail->addAddress('saratravelsaif@gmail.com',"SARA TRAVELS");
  //Set the subject line
  $mail->Subject = $subject;
  //Read an HTML message body from an external file, convert referenced images to embedded,
  //convert HTML into a basic plain-text alternative body
  
$mailhtml='<table cellpadding="10" cellspacing="0" border="0" bordercolor="#ccc" >
            <tr>
               
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;"> Full Name :</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">'.$name.'</th>
            </tr>
            <tr>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">Email :</th>
                 <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">'.$email.'</th>
                
            </tr>
            <tr>               
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">Subject :</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">'.$subject.'</th>
            </tr>
            <tr>               
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">Message :</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;text-align:left;">'.$message.'</th>
            </tr>
            
            ';
$mail->Body = $mailhtml;
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';


//send the message, check for errors
if (!$mail->send()) {
	echo "Mailer Error: " . $mail->ErrorInfo;
} 
else {
	echo ("1");

}


?>