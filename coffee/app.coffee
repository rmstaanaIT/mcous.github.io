# nav link variables
navCollapse = $ '#nav-top-collapse'
dropdown = $ '[data-toggle="dropdown"]'
chevron = dropdown.children('span')

# scroll to function using jquery's scrollTop property
scrollOff = $('#nav-top').height()
scrollTo = (target, ms = 250, cb) ->
  $('html, body').animate {
    scrollTop: $(target).offset().top - scrollOff
  }, ms, 'swing', (if cb? and typeof cb is 'function' then cb else null)

# event listener on dropdown toggle to switch carret
dropdown.on 'click', (e) ->

  if dropdown.parent().hasClass 'open'
    chevron.removeClass('octicon-chevron-up').addClass 'octicon-chevron-down'
  else
    chevron.removeClass('octicon-chevron-down').addClass 'octicon-chevron-up'

# event listeners on nav links

$('.link-scroll').on 'click', (e) ->
  e.preventDefault()
  e.stopPropagation()
  # get the id of the target element
  target = $(this).attr 'href'
  if target is '#' then target = 'body'
  # scroll to the id
  scrollTo target, 250, ->
    # close any dropdowns and collapsables
    dropdown.parent().removeClass('open')
    dropdown.children('span').removeClass('octicon-chevron-up').addClass 'octicon-chevron-down'

    if navCollapse.hasClass 'in' then navCollapse.collapse 'toggle'
