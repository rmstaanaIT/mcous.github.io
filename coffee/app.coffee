# scroll to function using jquery's scrollTop property
scrollOff = $('#nav-top').height()
scrollTo = (target, ms = 250, cb) ->
  $('html, body').animate {
    scrollTop: $(target).offset().top - scrollOff
  }, ms, 'swing', (if cb? and typeof cb is 'function' then cb else null)

# event listeners on nav links
$('.link-scroll').on 'click', (e) ->
  e.preventDefault()
  e.stopPropagation()
  # get the id of the target element
  target = $(this).attr('href')
  if target is '#' then target = 'body'
  # scroll to the id
  scrollTo target, 250, ->
    # close any dropdowns and collapsables
    $('[data-toggle="dropdown"]').parent().removeClass 'open'
    $('#nav-top-collapse').collapse('toggle')
