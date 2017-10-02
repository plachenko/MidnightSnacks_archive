$(document).ready(function(){
   var aud = $('#audio_cont')[0];
   var num = 0;

   $('.show').on('click', function(e){
      e.preventDefault();

      num = $(this).index();

      setCurrent(num);
      playAudio(num);

   });

   function setCurrent(_num){
      var cur = $('#show_cont').find('.current');
          cur.toggleClass('current');

      var el = $('#show_cont').children()[_num];

      $(el).toggleClass('current');

   }

   function playAudio(_num){

      var url = $('#show_cont').children()[_num].innerHTML;

      $('#song_src').attr('src', url);

      aud.load();
      aud.play();
   }

   aud.onended = function(){
      if(num < $('#show_cont').children().length-1){
         num++;
      }else{
         num = 0;
      }
      setCurrent(num);
      playAudio(num);
   };
});