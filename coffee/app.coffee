# scroll to function using jquery's scrollTop property
scrollTo = (target, ms = 250, cb) ->
  $('html, body').animate {
    scrollTop: $(target).offset().top
  }, ms, 'swing', (if cb? and typeof cb is 'function' then cb else null)

# even listeners on nav links
$('.link-scroll').on 'click', (e) ->
  e.preventDefault()
  e.stopPropagation()
  # get the id of the target element
  target = $(this).attr('href')
  if target is '#' then target = 'body'
  # scroll to the id
  scrollTo target
