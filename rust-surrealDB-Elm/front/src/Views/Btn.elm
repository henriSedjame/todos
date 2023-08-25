module Views.Btn exposing (..)


import Color
import Html exposing (Html, div, span)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Material.Icons exposing (add, check, delete, edit)
import Material.Icons.Types exposing (Coloring(..), Icon)
import Models.ViewModels exposing (ButtonIcon(..))
import StateManagement.Actions exposing (TodoActions)
import Views.Styles exposing (btnActiveClass, btnClass, btnIconSize, btnStyling, iconClass)

btn : Bool -> ButtonIcon -> TodoActions -> Html TodoActions
btn active icon action =
    let
        clazz =
            if active then
                btnClass ++ " " ++ btnActiveClass
            else
                btnClass
    in
        div []
        [
            btnStyling,
            div[  class clazz , onClick action]
            [
                span[ class iconClass ][
                    (toIcon icon) btnIconSize (Color <| Color.rgb255 151 151 151)
                ]
            ]
        ]

toIcon : ButtonIcon -> Icon msg
toIcon icon =
    case icon of
        Add -> add
        Check -> check
        Edit -> edit
        Delete -> delete

