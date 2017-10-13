$(document).ready(function(){
   var aud = $('#audio_cont')[0];
   var num = 0;
   var current;

   $("#show_cont").pagination({
      dataSource: f,
      pageSize: 15,
      pageRange: 10,
      callback: function(data, pagination){
         var html =$("<div>");
         data.forEach(function(i, ind){
            var $div = $('<div>', {"data-num":i[1],"data-url": i[0], "class":'show'});
            var $span = $('<span>', {"class":'showDate'}).html(i[2]);
            var $a = $('<a>',{"class":"ms_lnk","target":"_blank","href":"http://midnightsnacks.fm/show/"+i[1]+"/"+i[2]}).html("Show "+ + i[1]);
            if(i[1]==current){
               $div.addClass('current');
            }

            $div.append($a);
            $div.append($span);

            $div.on('click', function(e){
                el = $(this);
               console.log(el);

                setCurrent(el);
                playAudio(el);
            });

            html.append($div);

         });
         $('#show_cont_list').html(html);
      }
   });

   function setCurrent(_el){
      current = _el.data('num');
      var cur = $('#show_cont').find('.current');
      if(cur){
         cur.toggleClass('current');
      }

      _el.toggleClass('current');
   }

   function playAudio(_el){
      var url = _el.data('url');

      $('#song_src').attr('src', url);

      aud.load();
      aud.play();
   }


   aud.onended = function(){

      var nextShow;
      if(($('.current').index()+1)%15 !== 0){
         nextShow = $('.current').next('.show');
      }else{
         console.log($('.current').data('num'));
         if($('.current').data('num') == 11){
            $("#show_cont").pagination('go',1);
         }else{
            $("#show_cont").pagination('next');
         }
         nextShow = $('.show').eq(0);
      }

      setCurrent(nextShow);
      playAudio(nextShow);

   };
});