# nav link variables
navCollapse = $ '#nav-top-collapse'
dropdown = $ '[data-toggle="dropdown"]'
chevron = dropdown.children('.octicon')

# gallery
gallery = $ '.list-gallery'

# scroll to function using jquery's scrollTop property
scrollOff = $('#nav-top').height()
scrollTo = (target, ms = 250, cb) ->
  $('html, body').animate {
    scrollTop: $(target).offset().top - scrollOff
  }, ms, 'swing', (if cb? and typeof cb is 'function' then cb else null)

# event listeners on nav links that scroll
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
    if navCollapse.hasClass 'in' then navCollapse.collapse 'toggle'

# event listener on dropdown focus to toggle chevron
dropdown.on 'focusin', (e) ->
  chevron.removeClass('octicon-chevron-down').addClass 'octicon-chevron-up'

dropdown.on 'focusout', (e) ->
  chevron.removeClass('octicon-chevron-up').addClass 'octicon-chevron-down'

# image gallery
gallery.each ->
  $(@).magnificPopup {
    delegate: 'a'
    type: 'image'
    tLoading: 'loading image #%curr%...',
    image: {
      verticalFit: true
    }
    gallery: {
      enabled: true
      preload: [1,1]
      #arrowMarkup: '<button title="%title%" type="button" class="mega-octicon octicon-move-%dir%"></button>'
    }
  }
