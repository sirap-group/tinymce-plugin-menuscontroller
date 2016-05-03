/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 2015 SIRAP SAS All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

var MutationObserver = window.MutationObserver
var $ = window.$
var tinymce = window.tinymce

tinymce.PluginManager.add('menuscontroller', function (editor) {
  function observebodyMutations () {
    // var targetDOMQuery = '#mce-plugin-headersfooters-remove-header'
    var menubarMenuDOMQuery = '.mce-container.mce-panel.mce-floatpanel.mce-menu'

    // select the target node
    var target = document.querySelector('body')

    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // search menu with menubarMenuDOMQuery
        var menus = $(mutation.addedNodes).filter(menubarMenuDOMQuery)
        if (menus.length) {
          if (menus.length > 1) throw new Error('ERROR: there is many menus rendered ! This case is not implemented !')
          // trigger an app:mceMenuRendered event with a 'evt.data.menu' property
          var menuRenderedEvent = $.Event('app:mceMenuRendered')
          $('body').trigger(menuRenderedEvent, menus[0])
        }
      })
    })

    // configuration of the observer:
    var config = { childList: true }

    // pass in the target node, as well as the observer options
    observer.observe(target, config)

  // later, you can stop observing
  // $timeout(function(){
  // 	observer.disconnect()
  // },10000)
  }

  function getMenubar () {
    var themeItems = editor.theme.panel.settings.items
    for (var i = 0; i < themeItems.length; i++) {
      var item = themeItems[i]
      if (item.type === 'menubar') return item.items
    }
  }

  function getMenuByName (name) {
    try {
      var menubar = getMenubar()
      for (var i = 0; i < menubar.length; i++) {
        var menu = menubar[i]
        if (menu.text.toLowerCase() === name.toLowerCase()) {
          return menu
        }
      }
    } catch (e) {
      throw new Error("Can't find the menu " + name + ' in menu bar')
    }
  }

  function getToolbars () {
    var themeItems = editor.theme.panel.settings.items
    for (var i = 0; i < themeItems.length; i++) {
      var item = themeItems[i]
      if (item.type === 'panel' && item.classes === 'toolbar-grp') return item.items
    }
  }

  $('body').on('app:mceMenuRendered', function (evt, menu) {
    $(menu).find('.mce-menu-item').each(function (i, menuItem) {
      $(menu).trigger('app:mceMenuItemRendered:' + $(menuItem).attr('id'))
    })
  })

  // start to observe menus rendering
  observebodyMutations()

  // exports the API to the 'menuscontroller' plugin
  // example:
  // var mceMenubar = editor.plugins.menuscontroller.getMenubar()
  this.getMenubar = getMenubar
  this.getMenuByName = getMenuByName
  this.getToolbars = getToolbars
})
