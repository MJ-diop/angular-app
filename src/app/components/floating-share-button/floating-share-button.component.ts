import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-floating-share-button',
  templateUrl: './floating-share-button.component.html',
  styleUrls: ['./floating-share-button.component.scss'],
})
export class FloatingShareButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    jQuery(document).ready(function ($) {
      jQuery(document).on('click', '.iconInner', function (e) {
        jQuery(this).parents('.botIcon').addClass('showBotSubject');
        $("[name='msg']").focus();
      });
      jQuery(document).on('click', '.closeBtn, .chat_close_icon', function (e) {
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').removeClass('showMessenger');
      });
      jQuery(document).on('submit', '#botSubject', function (e) {
        e.preventDefault();
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').addClass('showMessenger');
      });
      /* Chatboat Code */
      $(document).on('submit', '#messenger', function (e) {
        e.preventDefault();
        /* variable */
        var mainval = $('[name=msg]').val();
        var nowtime = new Date();
        var iconBot = './../../../assets/img/icons/bot.jpg';
        var iconUser = './../../../assets/img/icons/user-chat5.jpg';

        function appendMsg(msg, position, colorText, bg, positionIcon, iconChat) {
          $('.Messages_list').append(
            '<div style="display: flex; flex-direction: ' +
              positionIcon +
              ';"><figure><img src=' +
              iconChat +
              '  width="60" height="60" alt="" /></figure><div class="msg" style="color: ' +
              colorText +
              '; background-color: ' +
              bg +
              '; align-self: ' +
              position +
              '; margin-bottom: 12px; width: fit-content; padding: 7px; border-radius: 5px; box-shadow: 0px 2px 1px 1px grey;"><span class="responsText">' +
              msg +
              '</span></div></div>'
          );
          $("[name='msg']").val('');
        }

        if (mainval) {
          appendMsg(mainval, 'flex-end', 'black', 'white', 'row-reverse', iconUser);
          responseFromBot(mainval);
        }

        function responseFromBot(message) {
          $.ajax({
            url: 'http://18.196.106.255:8090/api/bot',
            type: 'POST',
            async: true,
            cache: false,
            crossDomain: true,
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({ msg: message }),
            dataType: 'json',
            success: (response) => {
              appendMsg(response.message, 'flex-start', 'white', '#f39221', 'row', iconBot);
            },
            error: (error) => {
              console.log(error);
              appendMsg('Oups, we had an error from the server', 'flex-start', 'white', '#f39221', 'row', iconBot);
            },
          });
          //appendMessage(BOT_NAME, BOT_IMG, "left", message);
        }
        var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
        $('.Messages').animate({ scrollTop: lastMsg }, 'slow');
      });
    });
  }
}
