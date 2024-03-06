export default {
  login_page: {
    login_with_email_button: 'descope-button#KAG9NgACSP',
    login_button: 'descope-button#VaCr2LiM1K',
    email_textbox: 'input[name="email"]',
    password_textbox: 'input[name="password"]',
    forgot_password: 'descope-button#vGbww3RITJ',
    reset_password_modal: 'descope-text#7ekqaI_T5T',
    register_now_with_email: 'descope-button#I1tsVIdiWU',
    error_message: '[data-type="error-message"]',
    code_submit_button: 'descope-button#submit',
    resend_button: 'descope-button#resend'
  },
  registration_page: {
    email_textbox: 'input[name="email"]',
    submit_button: 'descope-button#DQfnTvyxi6',
    verify_your_email_modal: 'descope-text#LmrSIGOWZb',
    verification_modal: 'descope-text#auED4dEJkJ',
    verification_passcode: 'descope-passcode#L1T9iO4p5U',
    registration_form: 'descope-text#JC9w5MolwQ',
    unique_display_name_label: 'descope-text-field[label="Unique Display Name"]',
    first_name_label: 'descope-text-field[label="First Name"]',
    last_name_label: 'descope-text-field[label="Last Name"]',
    phone_label: 'descope-phone-field-internal[name="phone"] descope-text-field',
    password_label: 'descope-password[label="Password"]',
    confirm_password_label: 'descope-password[label="Confirm password"]',
    submit_registration_button: 'descope-button#HanAkXLH2l',
    code_error_message: '[data-type="error-message"]',
    email_error_message: 'div#error-message-vaadin-email-field-2',
    field_error_message: 'div[slot="error-message"][role="alert"]',
    im_ready_button: 'descope-button#04xtUWhDpa'
  },
  club_house_page: {
    enter_lobby_button: '.enter-lobby-styles'
  },
  club_selection_page: {
    club_list: 'a.clublink>img'
  },
  navigation_bar: {
    avatar_button: 'div#navbarSupportedContent img',
    logout_button: 'div#navbarSupportedContent li:nth-child(4) a:nth-child(4)',
    account_button: 'div#navbarSupportedContent li:nth-child(4) a:nth-child(3)'
  },
  lobby_page: {
    cashier_button: '.nav-link.cashier'
  },
  account_settings_page: {
    avatar_menu: 'a#avatar-pill-vertical',
    avatar_images: 'p.card-text tr td img',
    help_menu: 'a#help-pill-vertical',
    go_to_help_portal_link: 'p.card-text>a',
    display_name_edit: '#editdisplayname',
    first_name_edit: '#editfirstname',
    last_name_edit: '#editlastname',
    address_edit: '#editaddress',
    display_name_textbox: 'input#displayname',
    first_name_textbox: 'input#firstname',
    last_name_textbox: 'input#lastname',
    address_textbox: 'input#address',
    change_phone_button: 'button#_mfaAddFactorButton',
    club_change_link: 'a[href*=cardhouseselection]',
    save_display_button: 'button[onclick="submitchange(\'displayname\')"]'
  },
  common: {
    message_modal: '.modal.show[aria-modal="true"]',
    error_message_modal: 'div#ErrorMessagesModal',
    verify_your_phone_modal: 'div#_mfaEnrollmentModal[aria-modal="true"]',
    send_text_button: 'button#send-text',
    submit_code_button: 'button#_mfaEnrollVerifyButton',
    finish_button: 'button#_mfaFinishEnrollButton'
  },
  cashier_page: {
    deposit_amount_txtbox: 'input#deposit_amount_usd',
    club_location_selector: '#selectedclub',
    club_location_withdraw_selector: 'select#selectedclub_withdraw',
    withdraw_amount_txtbox: 'input#withdrawal_amount_usd',
    find_user_txtbox: 'input#usertovalidate',
    find_user_button: 'button#validatebutton_transfer',
    refresh_history_button: 'button#refreshhistory',
    process_deposit_button: '#deposit-form .btn-primary',
    process_withdraw_button: '#club-withdrawal-form .btn-primary',
    verification_modal: 'div#MFAModalCenter[aria-modal="true"]',
    withdrawal_notif: 'div#mfa-alert-box-clubwithdraw',
    deposit_notif: 'div#mfa-alert-box-clubdeposit',
    received_code_sms_button: 'input#sms-button',
    enter_code_txtbox: 'input#verificationCode',
    verify_code_button: 'input#Verify-button',
    notification_verication_msg: 'p#hiddentext',
    player_email: 'input#selectuserlabel_0',
    select_user_button: 'button#selectuser_0',
    amount_to_transfer_label: 'div#transferform > label',
    send_transfer_button: 'button#mfa-button-transfer',
    amount_to_transfer_textbox: 'input#transfer_amount_usd',
    spinner_selector: '.spinner',
    send_money_label: 'form#transfer-form > label',
    select_player_label: 'div#userlist > label',
    history_pane: 'div#historyPillVertical.show',
    history_table_data: '.tableBody',
    history_type_column: 'td:nth-child(5)'
  },
  cashier_menu: {
    club_deposit_button: '#depositclub-pill-vertical',
    club_withdraw_button: '#withdrawclub-pill-vertical',
    crypto_deposit_button: '#deposit-pill-vertical',
    crypto_withdraw_button: '#withdraw-pill-vertical',
    transfer_button: '#transfer-pill-vertical',
    history_button: '#history-pill-vertical'
  }
};