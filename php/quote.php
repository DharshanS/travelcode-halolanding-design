<?php
/**
 * Created by PhpStorm.
 * User: tharangi
 * Date: 7/9/2017
 * Time: 5:44 PM
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that


$campanyName=$_GET['company'];
$firstName=$_GET['fName'];
$item=$_GET['item'];
$email=$_GET['email'];
$mobileNo=$_GET['pNumber'];
$qantity=$_GET['qantity'];
$description=$_GET['description'];





date_default_timezone_set('Etc/UTC');

require './PHPMailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
//Tell PHPMailer to use SMTP
//$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug   = 2;
$mail->DKIM_domain = 'signartgifts.com';
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host        = "localhost";//mail.gmail.com
//Set the SMTP port number - likely to be 25, 465 or 587
//$mail->Port        = 465;
//Whether to use SMTP authentication
$mail->SMTPAuth    = true;
//Username to use for SMTP authentication
$mail->Username    ="vignesh@signartgifts.com";
//Password to use for SMTP authentication
$mail->Password    = "Vignesh1984";
//$mail->SMTPSecure  = 'ssl';
//Set who the message is to be sent from
$mail->setFrom('no-reply@signartgifts.com', 'signartgifts');
//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('signartgifts@gmail.com', 'signartgifts');
//Set the subject line
$mail->Subject = 'REQUEST A QUOTE';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML();
$mailhtml='<table cellpadding="10" cellspacing="0" border="0" bordercolor="#ccc" >
            <tr>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">campanyName</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">First Name</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">Item</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">Email</th>
                 <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">Mobile No</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">Qantity</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">Description</th>
            </tr>
            <tr>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$campanyName.'</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$firstName.'</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$item.'</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$email.'</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$mobileNo.'</th>
                <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$qantity.'</th>
                 <th style="border-bottom: 1px solid #2eade2;border-top: 1px solid #2eade2;">'.$description.'</th>
            </tr>
            
            ';
$mail->Body = $mailhtml;
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';


//send the message, check for errors
if (!$mail->send()) {
    echo "Please send a mail through info@signartgifts.com  " . $mail->ErrorInfo;
} else {
    echo " Will come back to you soon!!! ";
}
?>