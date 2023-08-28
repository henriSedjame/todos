module Views.Styles exposing (..)

import Css exposing (Color, Style, absolute, alignItems, backgroundColor, bold, border, borderBottom3, borderRadius, boxShadow, boxShadow4, boxShadow5, center, color, column, cursor, displayFlex, flexDirection, flexEnd, flexGrow, focus, fontFamilies, fontSize, fontWeight, height, hex, int, justifyContent, left, margin, margin2, marginTop, none, num, outline, padding, padding2, pct, pointer, position, px, relative, row, solid, spaceBetween, start, textAlign, top, transparent, width)
import Css.Global exposing (Snippet, body, children, class, global, input, withClass)
import Html.Styled


blackColor : Color
blackColor =
    hex "000000"


whiteColor : Color
whiteColor =
    hex "ffffff"


lightedLineColor : Color
lightedLineColor =
    hex "14ffb0"


lineColor : Color
lineColor =
    hex "6e6e6e"


bgColor : Color
bgColor =
    hex "242424"


textColor : Color
textColor =
    hex "bfbfbf"


textInactiveColor : Color
textInactiveColor =
    hex "5d5c5d"


inputBgColor : Color
inputBgColor =
    hex "3d3d3d"


btnColor : Color
btnColor =
    hex "555353"


btnIconColor : Color
btnIconColor =
    hex "979797"


btnHoverShadow : Style
btnHoverShadow =
    boxShadow4 (px 1) (px 1) (px 2) lightedLineColor


errorBgColor : Color
errorBgColor =
    hex "933434"


textSize : Css.Px
textSize =
    px 20


textFontFamily : Style
textFontFamily =
    fontFamilies [ "Lato", "sans-serif" ]


textFontWeight : Style
textFontWeight =
    fontWeight (int 100)


btnSize : Css.Px
btnSize =
    px 45


btnRadius : Css.Pct
btnRadius =
    pct 30


btnIconPosX : Css.Px
btnIconPosX =
    px 8.5


btnIConPosY : Css.Px
btnIConPosY =
    px 8.5


btnIconSize : Int
btnIconSize =
    28


inputBlocWidth : Css.Pct
inputBlocWidth =
    pct 85


noShadow : Style
noShadow =
    boxShadow none


noBorder : Style
noBorder =
    border (px 0)



-- classes --


editTodoId =
    "edit-todo"


inactiveTextClass =
    "inactive-text"


btnClass =
    "btn"


iconClass =
    "icon"


spaceClass =
    "space"


btnActiveClass =
    "btn-active"


appContentClass =
    "app-content"


errorClass =
    "error"


inputBlocClass =
    "input-bloc"


filterBlocClass =
    "filter-bloc"


filterDividerClass =
    "filter-divider"


filterOptionClass =
    "filter-option"


filterActiveClass =
    "filter-option-active"


todoLineClass =
    "todo-line"


todoCheckClass =
    "todo-check"


todoLabelClass =
    "todo-label"


todoActionsClass =
    "todo-action"



-- Global styles --


globalStyling : Html.Styled.Html msg
globalStyling =
    global
        [ bodyStyle
        , commonStyles.inactiveText
        , commonStyles.space
        , inputStyle
        , editTodoViewStyle
        , filterBarStyle
        , todoViewStyle
        , btnStyles.btn
        , btnStyles.btnActive
        ]



-- Components styles --


commonStyles : { inactiveText : Snippet, space : Snippet }
commonStyles =
    { inactiveText =
        class inactiveTextClass
            [ color textInactiveColor
            ]
    , space =
        class spaceClass
            [ width (px 5)
            ]
    }


inputStyle =
    input
        [ width (pct 80)
        , height (px 35)
        , noBorder
        , padding (px 5)
        , margin (px 5)
        , fontSize textSize
        , textFontFamily
        , textFontWeight
        , color textInactiveColor
        , backgroundColor inputBgColor
        , focus
            [ outline none
            , color textColor
            ]
        ]



-- body --


bodyStyle =
    body
        [ width (pct 100)
        , displayFlex
        , flexDirection column
        , alignItems center
        , backgroundColor bgColor

        --text--
        , color textColor
        , textFontFamily
        , textFontWeight

        -- global classes --
        , children
            [ appContentStyles
            ]
        ]



-- app --


appContentStyles =
    class appContentClass
        [ width (px 800)
        , children
            [ class errorClass
                [ width inputBlocWidth
                , borderRadius (px 10)
                , marginTop (px 40)
                , padding (px 20)
                , textAlign center
                , backgroundColor errorBgColor
                , color textColor
                , fontSize textSize
                , textFontWeight
                ]
            ]
        ]



-- btn --


btnStyles : { btn : Snippet, btnActive : Snippet }
btnStyles =
    { btn =
        class btnClass
            [ backgroundColor btnColor
            , width btnSize
            , height btnSize
            , borderRadius btnRadius
            , position relative
            , children
                [ class iconClass
                    [ position absolute
                    , color btnIconColor
                    , top btnIConPosY
                    , left btnIconPosX
                    , textFontWeight
                    ]
                ]
            ]
    , btnActive =
        class btnActiveClass
            [ cursor pointer
            , btnHoverShadow
            , children
                [ class iconClass
                    [ color lightedLineColor
                    , noBorder
                    , noShadow
                    ]
                ]
            ]
    }



-- edit_todo --


editTodoViewStyle =
    class inputBlocClass
        [ displayFlex
        , flexDirection row
        , justifyContent spaceBetween
        , alignItems center
        , marginTop (px 20)
        , padding2 (px 0) (px 10)
        , width inputBlocWidth
        , backgroundColor inputBgColor
        , borderBottom3 (px 1) solid lightedLineColor
        , boxShadow5 (px 0) (px 3) (px 10) (px -2) blackColor
        ]



-- filter bar --


filterBarStyle =
    class filterBlocClass
        [ displayFlex
        , flexDirection row
        , marginTop <| px 10
        , children
            [ class filterDividerClass
                [ margin2 (px 0) (px 10)
                , width (px 2)
                , height (px 20)
                , backgroundColor whiteColor
                ]
            , class filterOptionClass
                [ cursor pointer
                , color textInactiveColor
                , withClass filterActiveClass
                    [ fontWeight bold
                    , color textColor
                    ]
                ]
            ]
        ]



-- _todo view --


todoViewStyle =
    class todoLineClass
        [ displayFlex
        , flexDirection row
        , justifyContent spaceBetween
        , alignItems center
        , padding (px 10)
        , width inputBlocWidth
        , backgroundColor transparent
        , borderBottom3 (px 1) solid lineColor
        , children
            [ class todoCheckClass
                [ flexGrow (num 1)
                ]
            , class todoLabelClass
                [ textAlign start
                , flexGrow (num 18)
                , fontSize (px 20)
                ]
            , class todoActionsClass
                [ displayFlex
                , flexDirection row
                , justifyContent flexEnd
                , flexGrow (num 2)
                ]
            ]
        ]
