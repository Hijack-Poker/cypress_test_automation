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
  },
  common: {
    message_modal: '.modal.show[aria-modal="true"]',
    error_message_modal: 'div#ErrorMessagesModal'
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
<<<<<<< HEAD
    verification_modal: 'div#MFAModalCenter[aria-modal="true"]',
=======
    verification_modal: '.modal-content',
>>>>>>> 30d3500ffa387f2319091ab9d8eaef0af7586db8
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
    select_player_label: 'div#userlist > label'
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