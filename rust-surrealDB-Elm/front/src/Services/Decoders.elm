module Services.Decoders exposing (..)

import Http exposing (Error(..), Response(..))
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import Models.Dto exposing (ApiCall(..), ApiResponse(..), ErrorResponse, Todo)


responseDecoder : ApiCall -> Response String -> Result Http.Error ApiResponse
responseDecoder call response =
    case response of
        BadUrl_ url ->
            Err (BadUrl url)

        Timeout_ ->
            Err Timeout

        NetworkError_ ->
            Err NetworkError

        BadStatus_ metadata body ->
            case Decode.decodeString errorDecoder body of
                Ok value ->
                    Ok (Failure value.message)

                Err _ ->
                    "Unexpected error : ( status => "
                        ++ String.fromInt metadata.statusCode
                        ++ " response => "
                        ++ body
                        ++ " )"
                        |> Failure
                        |> Ok

        GoodStatus_ _ body ->
            case Decode.decodeString (apiResponseDecoder call) body of
                Ok value ->
                    Ok value

                Err _ ->
                    "Unexpected error : ( response => "
                        ++ body
                        ++ " )"
                        |> Failure
                        |> Ok


apiResponseDecoder : ApiCall -> Decode.Decoder ApiResponse
apiResponseDecoder call =
    case call of
        GetAll ->
            Decode.map TodosLoaded (Decode.list todoDecoder)

        Create ->
            Decode.map TodoCreated todoDecoder

        Update ->
            Decode.map TodoUpdated todoDecoder

        Delete id ->
            Decode.map TodoDeleted (Decode.succeed id)


todoDecoder : Decode.Decoder Todo
todoDecoder =
    Decode.succeed Todo
        |> required "id" Decode.string
        |> required "label" Decode.string
        |> required "completed" Decode.bool


errorDecoder : Decode.Decoder ErrorResponse
errorDecoder =
    Decode.succeed ErrorResponse
        |> required "message" Decode.string
