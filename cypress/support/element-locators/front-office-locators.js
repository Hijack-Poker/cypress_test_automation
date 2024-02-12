export default {
  login_page: {
    login_with_email_button: 'descope-button#KAG9NgACSP',
    login_button: 'descope-button#VaCr2LiM1K',
    email_textbox: 'input[name="email"]',
    password_textbox: 'input[name="password"]',
    forgot_password: 'descope-button#vGbww3RITJ',
    reset_password_modal: 'descope-text#7ekqaI_T5T',
    error_message: '[data-type="error-message"]'
  },
  club_house_page: {
    enter_lobby_button: '.enter-lobby-styles'
  },
  navigation_bar: {
    avatar_button: 'div#navbarSupportedContent img',
    logout_button: 'div#navbarSupportedContent li:nth-child(4) a:nth-child(4)',
    account_button: 'div#navbarSupportedContent li:nth-child(4) a:nth-child(3)'
  },
  lobby_page: {
    cashier_button: '.cashier.nav-link'
  },
  account_settings_page: {
    avatar_menu: 'a#avatar-pill-vertical',
    help_menu: 'a#help-pill-vertical',
    go_to_help_portal_link: 'p.card-text>a',
    avatar_images: 'p.card-text tr td img',
    avatar_updated_modal: 'div#basicExampleModal'
  },
  cashier_page: {
    deposit_amount_txtbox: 'input#deposit_amount_usd',
    club_location_selector: 'select#selectedclub',
    club_location_withdraw_selector: 'select#selectedclub_withdraw',
    withdraw_amount_txtbox: 'input#withdrawal_amount_usd',
    find_user_txtbox: 'input#usertovalidate',
    find_user_button: 'button#validatebutton_transfer',
    refresh_history_button: 'button#refreshhistory',
    process_deposit_button: '#deposit-form .btn-primary',
    process_withdraw_button: '#club-withdrawal-form .btn-primary',
    verification_modal: 'div#MFAModalCenter  .modal-content',
    withdrawal_notif: 'div#mfa-alert-box-clubwithdraw',
    deposit_notif: 'div#mfa-alert-box-clubdeposit',
    received_code_sms_button: 'input#sms-button',
    enter_code_txtbox: 'input#verificationCode',
    verify_code_button: 'input#Verify-button',
    notification_verication_msg: 'p#hiddentext',
    player_email: 'input#selectuserlabel_0',
    select_user_button: 'button#selectuser_0',
    label_txt: 'div#transferform > label',
    user_not_found_modal: 'div#MessagesModal > .modal-content-message',
    send_transfer_button: 'button#mfa-button-transfer',
    amount_to_transfer_textbox: 'input#transfer_amount_usd',
    spinnerSelector: '.spinner'
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