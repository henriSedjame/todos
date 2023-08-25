module Views.Styles exposing (..)

import Css exposing (Color, Style, absolute, alignItems, backgroundColor, batch, border, borderBottom3, borderColor, borderRadius, borderStyle, boxShadow, boxShadow4, boxShadow5, center, color, column, cursor, displayFlex, flexDirection, focus, fontFamilies, fontSize, fontWeight, height, hex, int, justifyContent, left, margin, marginTop, none, outline, padding, padding2, pct, pointer, position, px, relative, row, solid, spaceBetween, textAlign, top, width)
import Css.Global exposing (body, children, class, global, input)
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)



blackColor : Color
blackColor = hex "000000"

lightedLineColor: Color
lightedLineColor = hex "14ffb0"

lineColor : Color
lineColor = hex "6e6e6e"

bgColor : Color
bgColor = hex "242424"

textColor : Color
textColor = hex "bfbfbf"

textInactiveColor : Color
textInactiveColor = hex "5d5c5d"

inputBgColor : Color
inputBgColor = hex "3d3d3d"

btnColor : Color
btnColor = hex "555353"

btnIconColor : Color
btnIconColor = hex "979797"

btnTextHoverColor : Color
btnTextHoverColor = hex "ffffff"

btnHoverShadow : Style
btnHoverShadow = boxShadow4 (px 1) (px 1) (px 2) lightedLineColor

errorBgColor : Color
errorBgColor = hex "933434"

textSize : Css.Px
textSize = px 20

textFontFamily : Style
textFontFamily = fontFamilies ["Lato", "sans-serif"]

textFontWeight : Style
textFontWeight = fontWeight (int 100)

btnSize : Css.Px
btnSize = px 45

btnRadius : Css.Pct
btnRadius = pct 30

btnIconPosX : Css.Px
btnIconPosX = px 8.5

btnIConPosY : Css.Px
btnIConPosY = px 8.5

btnIconSize : Int
btnIconSize = 28

inputBlocWidth : Css.Pct
inputBlocWidth= pct 85

noShadow : Style
noShadow = boxShadow none

noBorder : Style
noBorder = border (px 0)

lightBorder : Style
lightBorder = batch [
        border (px 1)
        ,borderColor lightedLineColor
        ,borderStyle solid
    ]

commonBorder : Style
commonBorder = batch[
        border (px 1)
        ,borderColor lineColor
        ,borderStyle solid
    ]

-- classes --
inactiveTextClass = "inactive-text"
btnClass = "btn"
iconClass = "icon"
spaceClass = "space"
btnActiveClass = "btn-active"

appContentClass = "app-content"
appContentErrorClass = "app-content-error"


editTodoViewClass = "edit-todo"
inputBlocClass = "input-bloc"

todoViewClass = "todo-view"
todoLineClass = "todo-line"
todoCheckClass = "todo-check"
todoLabelClass = "todo-label"
todoActionsClass = "todo-action"
--selectors--
inputPlaceholder = "input[placeholder]"

-- Global styles --

globalStyling : Html msg
globalStyling = global
    [
        body [
            width (pct 100)
            ,displayFlex
            ,flexDirection column
            ,alignItems center
            ,backgroundColor bgColor

            --text--
            ,color textColor
            ,textFontFamily
            ,textFontWeight

            -- global classes --
            , children [

                class inactiveTextClass [
                    color textInactiveColor
                ]

                ,class spaceClass [
                    width (px 5)
                ]

                ,appContentStyling
            ]
        ]
        , input [
            width (pct 80)
            ,height (px 35)
            ,noBorder
            ,padding (px 5)
            ,margin (px 5)
            ,fontSize textSize
            ,textFontFamily
            ,textFontWeight
            ,color textInactiveColor
            ,backgroundColor inputBgColor
            ,focus [
                outline none
                ,color textColor
            ]
        ]

    ] |> toUnstyled

-- Components styles --

-- app --
appContentStyling = class appContentClass
    [
        width (px 800),

        children [
            class appContentErrorClass [
                width inputBlocWidth
                ,borderRadius (px 10)
                ,marginTop (px 40)
                ,padding (px 20)
                ,textAlign center
                ,backgroundColor errorBgColor
                ,color textColor
                ,fontSize textSize
                ,textFontWeight
            ]
        ]
    ]

-- btn --
btnStyling = global [
    class btnClass [
            backgroundColor btnColor
            ,width btnSize
            ,height btnSize
            ,borderRadius btnRadius
            ,position relative
            , children [
                class iconClass [
                    position absolute
                    ,color btnIconColor
                    ,top btnIConPosY
                    ,left btnIconPosX
                    ,textFontWeight

                ]
            ]
        ]
        ,class btnActiveClass [
            cursor pointer
            ,btnHoverShadow
            ,children [
                class iconClass[
                    color lightedLineColor
                    ,noBorder
                    ,noShadow
                ]
            ]
        ]
    ] |> toUnstyled

-- edit_todo --
editTodoViewStyling = global [
        class editTodoViewClass
            [
                children[
                    class inputBlocClass [
                        displayFlex
                        ,flexDirection row
                        ,justifyContent spaceBetween
                        ,alignItems center
                        ,marginTop (px 20)
                        ,padding2 (px 0) (px 10)
                        ,width inputBlocWidth
                        ,backgroundColor inputBgColor
                        ,borderBottom3 (px 1) solid lightedLineColor
                        ,boxShadow5 (px 0) (px 3) (px 10) (px -2) blackColor
                    ]
                ]
            ]
    ] |> toUnstyled