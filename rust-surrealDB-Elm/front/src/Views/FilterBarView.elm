module Views.FilterBarView exposing (..)

import Html.Styled exposing (Html, div, span, text)
import Html.Styled.Attributes exposing (class)
import Html.Styled.Events exposing (onClick)
import Models.ViewModels exposing (FilterOption(..))
import StateManagement.Actions exposing (TodoActions(..))
import Views.Styles exposing (filterActiveClass, filterBlocClass, filterDividerClass, filterOptionClass)


filterBarView : FilterOption -> Html TodoActions
filterBarView option =
    let
        classes =
            case option of
                All ->
                    ( filterOptionClass ++ " " ++ filterActiveClass, filterOptionClass )

                Completed ->
                    ( filterOptionClass, filterOptionClass ++ " " ++ filterActiveClass )
    in
    div [ class filterBlocClass ]
        [ span [ class <| Tuple.first classes, onClick <| ChangeFilter All ] [ text "View All" ]
        , div [ class filterDividerClass ] []
        , span [ class <| Tuple.second classes, onClick <| ChangeFilter Completed ] [ text "Completed" ]
        ]
