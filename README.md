# **Tinymce Plugin MenusController**


[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Bower version](https://badge.fury.io/bo/tinymce-plugin-menuscontroller.png)](https://badge.fury.io/bo/tinymce-plugin-menuscontroller)
[![GitHub license](https://img.shields.io/badge/license-GPLv2-blue.svg)](https://raw.githubusercontent.com/sirap-group/tinymce-plugin-menuscontroller/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/sirap-group/tinymce-plugin-menuscontroller.svg)](https://github.com/sirap-group/tinymce-plugin-menuscontroller/issues)
[![GitHub forks](https://img.shields.io/github/forks/sirap-group/tinymce-plugin-menuscontroller.svg)](https://github.com/sirap-group/tinymce-plugin-menuscontroller/network)
[![GitHub stars](https://img.shields.io/github/stars/sirap-group/tinymce-plugin-menuscontroller.svg)](https://github.com/sirap-group/tinymce-plugin-menuscontroller/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/sirap-group/tinymce-plugin-menuscontroller.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

A plugin that helps to handle and control tinymce&#39;s menu bars, menus and menu items

# Install the plugin

Download the latest release tarball from github or, even better, install it from bower:

    bower install tinymce-plugin-menuscontroller

If you don't know `bower`, discover it here: https://bower.io (`npm i -g bower; bower --help`).

The npm package isn't available yet, I'd provide it soon (but any Pull Request on github is welcome...).

By default, the plugin folder would be downoaded and placed in `./bower_components`. If you've installed tinymce the same way, you've got also `./bower_components/tinymce` or `./bower_components/tinymce-dist`.

You **don't need** to add the script to your `index.html` file because tinymce load it itself if you setup it correctly.

So you need to :

1. symlink it to the tinymce plugin folder:

        $ cd ./bower_components/tinymce/plugins
        $ ln -s ../../tinymce-plugin-menuscontroller menuscontroller

2. load it in tinymce init. For example:

    tinymce.init({
      selector: 'textarea',
      // [...]
      plugins: 'menuscontroller'
    })

# Get the plugin instance:

    var editor = window.tinymce.activeEditor
    var menusCtl = editor.plugins.menuscontroller
    // at this point, if menusCtl is undefined, something gone wrong in the setup step: please check the previous steps.

# Plugin API (v0.2.1)

## Instance Methods

Get the menu bar:

    menusCtl.getMenubar()

Get each menu by the name it was registered with:

    menusCtl.getMenuByName(String: name)

Get the toolbars

    menusCtl.getToolbars

## Events


### Event: `menusController:mceMenuRendered` event

When any tinymce menu is rendered

    $('body').on('menusController:mceMenuRendered', function (evt, menuDomNode) {
      console.log(menuDomNode)
    })

> The `menusController:mceMenuRendered` event is called one for each menu of the active editor menubar, when it is rendered, so when the user click the dropdown menu (`File` link for the "file" menu, `Insert` for the "insert" menu, etc...).

### Event: `menusController:mceMenuItemRendered:<menuDomID>`

When any menu item is rendered. Let's say we've created a menu item with the `my-custom-menu-item` identifier. So tinymce set its DOM ID to `my-custom-menu-item`. Thus, the MenusController plugin will create and bind to body the following event:

    menusController:mceMenuItemRendered:my-custom-menu-item

So you can handle the rendered event of your custom menu item listening on it:

    $('body').on('menusController:mceMenuItemRendered:my-custom-menu-item',
      function (evt, menuItemDomNode) {
        console.log(menuItemDomNode)
      }
    )

# MenusController API (v0.3.0+)

> A the time of wrinting (Monday, mars the 13th, 2017), the last released version is the `v0.2.1`. But the `v0.3.0` is planned to be released soon, and will provide a new event, more useful than the last.

### Event: `menusController:mceMenuItemRendered`

> When you need to know the menu item ID to handle the event `menusController:mceMenuItemRendered:<menuDomID>` and get the menu item DOM Node as callback argument, the event `menusController:mceMenuItemRendered` don't needs it but provides it as callback argument for each new rendered menu item:


    $('body').on('menusController:mceMenuItemRendered',
      function (evt, menuItemID) {
        console.log(menuItemID) // 'my-custom-menu-item'

        // So you can hanlde all menu item even if you don't know its ID
        // And you can also handle the DOM Node with the selector by ID
        var selector = '#' + menuItemID
        var menuItem = $(selector)
        console.log(menuItem) // jQuery object (the menu item)
      }
    )

# Credits

- Rémi Becheras
    - <rbecheras@sirap.fr>
- Groupe SIRAP
    - <http://sirap.fr>
    - <https://github.com/sirap-group>

# License

This plugin is open-sourced under the **GNU LGPL v2**, following the original Tinymce license policy.
