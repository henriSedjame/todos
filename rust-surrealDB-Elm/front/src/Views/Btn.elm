module Views.Btn exposing (..)

import Color
import Html.Styled exposing (Html, div, fromUnstyled, span)
import Html.Styled.Attributes exposing (class)
import Html.Styled.Events exposing (onClick)
import Material.Icons exposing (add, check, delete, edit)
import Material.Icons.Types exposing (Coloring(..), Icon)
import Models.ViewModels exposing (ButtonIcon(..))
import StateManagement.Actions exposing (TodoActions)
import Views.Styles exposing (btnActiveClass, btnClass, btnIconSize, iconClass)


btn : Bool -> Maybe ButtonIcon -> TodoActions -> Html TodoActions
btn active icon action =
    let
        clazz =
            if active then
                btnClass ++ " " ++ btnActiveClass

            else
                btnClass

        attributes =
            case icon of
                Just i ->
                    [ toIcon i btnIconSize (Color <| Color.rgb255 151 151 151) |> fromUnstyled ]

                Nothing ->
                    []
    in
    div [ class clazz, onClick action ]
        [ span [ class iconClass ] attributes
        ]


toIcon : ButtonIcon -> Icon msg
toIcon icon =
    case icon of
        Add ->
            add

        Check ->
            check

        Edit ->
            edit

        Delete ->
            delete
