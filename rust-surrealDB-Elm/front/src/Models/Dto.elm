module Models.Dto exposing (..)


type alias Todo =
    { id : String
    , label : String
    , completed : Bool
    }


type alias AddTodoRequest =
    { label : String
    }


type alias UpdateTodoRequest =
    { label : String
    , completed : Bool
    }


type alias TodoDeleteResult =
    { deleted : Bool
    }


type alias ErrorResponse =
    { message : String
    }


type ApiCall
    = GetAll
    | Create
    | Update
    | Delete String


type ApiResponse
    = TodosLoaded (List Todo)
    | TodoCreated Todo
    | TodoUpdated Todo
    | TodoDeleted String
    | Failure String
