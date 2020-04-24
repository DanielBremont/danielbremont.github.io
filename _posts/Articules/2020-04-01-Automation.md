---
layout: post
title: Automation
categories: [articles]
tags: [utomation]
---

## AutoHotKey
**[Ir](https://www.maketecheasier.com/favorite-autohotkey-scripts/){:target="_blank"}**

AutoHotKey is one of the best Windows automation programs that can perform the simplest of actions to the hardest of tasks. AutoHotKey is a free and open-source program which uses its own scripting language to automate any of your daily Windows tasks. Even though the “scripting language” sounds intimidating, it is very easy to use, and you can do all sorts of cool things.

Let me share my favorite and most-used AutoHotKey scripts which make my daily tasks a little bit easier, and that may help you.

<!--more-->

## Google Search Shortcut

Google had the right idea when it turned the unloved and underused Caps Lock key into a dedicated search button that searched both your computer and Google. In the spirit of Chromebooks, you can turn the Caps Lock key into a Google Search key.

The following script will automatically search Google when you highlight a bit of text and press ```Ctrl + Shift + C```:

```autohotkey

; Google Search highlighted text
^+c::
{
 Send, ^c
 Sleep 50
 Run, http://www.google.com/search?q=%clipboard%
 Return
}

```

## AutoCorrect

In the time that Windows has existed, smartphones have evolved immeasurably to the point that they now have touchscreens and autocorrect built in. So why not have autocorrect on Windows 10?

In Autohotkey’s repository of scripts, you can find an autocorrect script, which contains thousands of common spelling errors that most people can easily make, then automatically fixes them as you write/make them.

Here’s the [link to download the script](https://www.autohotkey.com/download/AutoCorrect.ahk). Just press ```Ctrl + A``` to select everything in the script, then copy it to a Notepad file that you should then save as “AutoCorrect.ahk.”

## Repurpose those Function Keys

Most of us hardly ever use the Function keys on our keyboard except for `F2` (rename), ```F5``` (refresh), and ```F11``` (full screen in the browser). Using AutoHotKey, you can repurpose those unused functions to do a variety of things like launching web pages, launching programs, etc. For instance, I use the function keys to launch my most-used programs like Snagit, Sublime Text, Photoshop, Calculator, Thunderbird, etc.

To launch a program, simply use the script below. Don’t forget to replace the program path with your favorite program.

```autohotkey

;Launch Sublime Text
F7::Run "C:\Program Files\Sublime Text 2\sublime_text.exe"
return

```

## Open Webpages Quickly

Just like launching your favorite programs, you can create your own custom shortcuts to launch your favorite websites. For instance, I use `Ctrl + Shift + T` to launch MakeTechEasier. Use the following script to launch your favorite web page. Don’t forget to replace the web address with your favorite site.

```autohotkey

; Launch MakeTechEasier
^+t::Run "www.maketecheasier.com" ; use ctrl+Shift+t
return

```

Just like the one above, you can create you own shortcuts using a combination of `Ctrl(^), Shift(+), Alt(!)`, and `Win(#)` keys.

## Open Favorite Folders

Along with opening web pages and programs, you can also open your most-used folders with just a simple shortcut. For instance, most of us access the Downloads folder often, and to make it easier, we can use a simple script like the one below. You can customize the script to change the shortcut and the folder path according to your needs.

```autohotkey

; Open Downloads folder
^+d::Run "C:\Users\Vamsi\Downloads" ; ctrl+shift+d
return

```

## Move Up a Folder in File Explorer

When you are in a folder, you often need to move up one folder. In previous versions of Windows, the backspace key has done the job, but now the backspace key moves you back in history. This is useful to many, but I still hate to click on that little icon to move up a folder, so I use the below script to move up a folder by clicking the middle mouse button.

```autohotkey

; Press middle mouse button to move up a folder in Explorer
#IfWinActive, ahk_class CabinetWClass
~MButton::Send !{Up} 
#IfWinActive
return

```

If you want to, you can also reconfigure the useless tilde (~) key on your keyboard to do the same action.


```autohotkey

; Press ~ to move up a folder in Explorer
#IfWinActive, ahk_class CabinetWClass
`::Send !{Up} 
#IfWinActive
return

```

## Adjusting Volume

Even though it doesn’t have any multimedia keys, I love my keyboard, but the lack of volume control buttons is a bit uncomfortable for me. So I use the following script to control the volume of my system.

```autohotkey

; Custom volume buttons
+NumpadAdd:: Send {Volume_Up} ;shift + numpad plus
+NumpadSub:: Send {Volume_Down} ;shift + numpad minus
break::Send {Volume_Mute} ; Break key mutes
return

```

## Set Default State of Lock Keys

Using AutoHotKey, you can easily set the default or permanent state of the lock keys on our keyboard, e.g. set Caps Lock to be turned off, Num Lock to be turned on and Scroll Lock to be turned off. This simple script is so helpful, and even if you press them accidentally, the lock state won’t change.

```autohotkey

; Default state of lock keys
SetNumlockState, AlwaysOn
SetCapsLockState, AlwaysOff
SetScrollLockState, AlwaysOff
return

```

## Reconfigure Caps Lock

After turning off the Caps Lock, you might want to reconfigure it to act as the `Shift` key. To reconfigure the Caps Lock key, use the below script.

```autohotkey

; Caps Lock acts as Shift
Capslock::Shift
return

```

## Empty Recycle Bin

You can use the below script to quickly empty the trash bin. This simple script saves me from using my mouse to do that same task.

```autohotkey

; Empty trash
#Del::FileRecycleEmpty ; win + del
return

```


## Temporarily Suspend AutoHotKey

The shortcuts created using AutoHotKey may sometimes interfere with some programs. In those cases you can temporarily disable AutoHotKey using the below script. Of course, if you don’t want to use a shortcut, then simply right-click on the AutoHotKey icon in the taskbar and select the option “Suspend Hotkeys.”

```autohotkey

; Suspend AutoHotKey
#ScrollLock::Suspend ; Win + scrollLock
return

```