package models

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	translations "github.com/go-playground/validator/v10/translations/en"
)

type TagErrorMsg struct{ tag, msg string }

var (
	TagErrorMessages = []TagErrorMsg{
		{"required", "A not empty {0} is required"},
	}
	validate *validator.Validate
	trans    *ut.Translator
)

func validationErrors[T Request](t T) []string {
	eng := en.New()
	uni := ut.New(eng, eng)
	setTranslator(uni)

	var errors []string

	if err := isValid(t); err != nil {
		for _, e := range err.(validator.ValidationErrors) {
			errors = append(errors, e.Translate(*trans))
		}
	}

	if len(errors) > 0 {
		return errors
	}

	return nil
}

// isValid : validate a struct
func isValid[T any](t T) error {
	setValidator(*trans)
	return validate.Struct(t)
}

func setTranslator(uni *ut.UniversalTranslator) {
	if trans == nil {
		t, _ := uni.GetTranslator("en")
		trans = &t
	}
}

func setValidator(translator ut.Translator) {
	if validate == nil {

		validate = validator.New()

		_ = translations.RegisterDefaultTranslations(validate, translator)

		for _, tem := range TagErrorMessages {

			_ = validate.RegisterTranslation(tem.tag, translator, func(ut ut.Translator) error {
				return ut.Add(tem.tag, tem.msg, true) // see universal-translator for details
			}, func(ut ut.Translator, fe validator.FieldError) string {
				t, _ := ut.T(tem.tag, fe.Field())
				return t
			})
		}

	}
}
