<?php

// make sure request is ajax
if ( empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest' ) {
    header("HTTP/1.1 500 Internal Server Error");
    die();
}

require_once('inc/init.php');

$fields = $_POST['field'];

$validation = new Validation();
$validation->validate_fields($fields);

if ( $validation->is_valid() ) {

    $mail = new Mail();

    $mail->set_option('from', EMAIL);
    $mail->set_option('to', LEADS_EMAIL);
    $mail->set_option('cc', LEADS_CC);
    $mail->set_option('subject', 'Formulaire Internet - ' . ORG);

    if ( $validation->is_valid_email($fields['email']['value']) ) {
        $mail->set_option('reply_to', $fields['email']['value']);
    }

    $body .= '<div style="background: #eee; padding: 40px;">';
    $body .= '<div style="max-width: 600px; min-width: 400px; margin: 0 auto;">';
    $body .= '<div style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #333; line-height: 1.5; padding: 20px; background: #fff; border: 1px solid #ddd;">';
    $body .= '<h1 style="margin: 0 0 10px 0;">' . $mail->get_option('subject') . '</h1>';

    $body .= $mail->build_fields_html($fields, array(
        'format'	=> 'table',
        'label_css' => 'width: 125px; white-space: nowrap; padding: 10px 10px 10px 0; border-top: 1px dotted #ddd; text-align: right; font-size: 10px; text-transform: uppercase; color: #666;',
        'value_css' => 'padding: 5px 0; border-top: 1px dotted #ddd; font-weight: bold;'
    ));

    $body .= '</div></div></div>';

    $mail->set_body($body);

    $mail->send();
    $response = $mail->get_response();

    switch ( $response ) {
        case 200 :
            header("HTTP/1.1 200 OK");
            break;
        case 400 :
            header("HTTP/1.0 400 Bad Request");
            break;
        case 500 :
            header("HTTP/1.1 500 Internal Server Error");
            break;
    }

}