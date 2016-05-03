/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 2015 SIRAP SAS All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

// browser globals
var MutationObserver = window.MutationObserver
var $ = window.$
var tinymce = window.tinymce

// register the createPlugin function
tinymce.PluginManager.add('menuscontroller', createPlugin)

function createPlugin (editor) {
  // expose the plugin API
  // example of usage:
  // var mceMenubar = editor.plugins.menuscontroller.getMenubar()
  this.getMenubar = getMenubar
  this.getMenuByName = getMenuByName
  this.getToolbars = getToolbars

  // trigger an event 'app:mceMenuItemRendered:<menu_item_id>' for each menu item when its parent menu is rendered
  $('body').on('app:mceMenuRendered', function (evt, menu) {
    $(menu).find('.mce-menu-item').each(function (i, menuItem) {
      $(menu).trigger('app:mceMenuItemRendered:' + $(menuItem).attr('id'))
    })
  })

  // start to observe menus rendering
  observeMenuRendering()

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
}

function observeMenuRendering () {
  // var targetDOMQuery = '#mce-plugin-headersfooters-remove-header'
  var menubarMenuDOMQuery = '.mce-container.mce-panel.mce-floatpanel.mce-menu'
  // select the target node
  var target = document.querySelector('body')
  // create an observer instance
  var observer = new MutationObserver(bodyMutationsCallback)
  // configuration of the observer:
  var config = { childList: true }

  // pass in the target node, as well as the observer options
  // later, we can stop observing with observer.disconnect()
  observer.observe(target, config)

  function bodyMutationsCallback (mutations) {
    mutations.forEach(function (mutation) {
      // search menu with menubarMenuDOMQuery
      var menus = $(mutation.addedNodes).filter(menubarMenuDOMQuery)
      if (menus.length) {
        // menus are renders once at time
        if (menus.length > 1) throw new Error('ERROR: there is many menus rendered ! This case is not implemented !')

        // trigger an 'app:mceMenuRendered' event with a 'evt.data.menu' property
        var menuRenderedEvent = $.Event('app:mceMenuRendered')
        $('body').trigger(menuRenderedEvent, menus[0])
      }
    })
  }
}
