$(function(){
  $(document).on('click', '.track', function (e) {
    var url = $(this).attr('href');

    e.preventDefault();

    // TRACKING A
    if($(this).hasClass('track-a')) {
      _gaq.push([
        '_trackEvent',
        'Sustainability Page',
        'Find Out more Click',
        'Find Out more'
      ]);
    }

    window.location = url;

  })
});