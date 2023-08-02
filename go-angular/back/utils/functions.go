package utils

type (
	Runnable func() error

	Consumer[T any] func(T) error

	Supplier[T any] func() (T, error)

	Function[T any, R any] func(T) (R, error)

	BiFunction[T1 any, T2 any, R any] func(T1, T2) (R, error)
)

func HandleSup[T any](supplier Supplier[T], consumer Consumer[T]) error {
	if t, err := supplier(); err != nil {
		return err
	} else {
		return consumer(t)
	}
}

func HandleFunc[T any, R any](t T, function Function[T, R], consumer Consumer[R]) error {
	if r, err := function(t); err != nil {
		return err
	} else {
		return consumer(r)
	}
}

func HandleBiFunc[T1 any, T2 any, R any](t1 T1, t2 T2, function BiFunction[T1, T2, R], consumer Consumer[R]) error {
	if r, err := function(t1, t2); err != nil {
		return err
	} else {
		return consumer(r)
	}
}

func HandleCons[T any](t T, consumer Consumer[T], runnable Runnable) error {
	if err := consumer(t); err != nil {
		return err
	} else {
		return runnable()
	}
}
