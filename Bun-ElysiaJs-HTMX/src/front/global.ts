document.body.addEventListener('labelChecked', (event) => {
    // @ts-ignore
    let {valid, action} = event.detail;

    let btn = null;
    if (action === 'edit') {
        btn = document.getElementById('add-task-button');
    } else if (action === 'update') {
        btn = document.getElementById('update-task-button');
    }

    if (btn) {
        if (valid) {
            // @ts-ignore
            btn.disabled = false;
            btn.classList.add('btn-active');
        } else {
            // @ts-ignore
            btn.disabled = true;
            btn.classList.remove('btn-active');
        }
    }
});

document.body.addEventListener('todoAdded', (event) => {
    // @ts-ignore
    let added = event.detail.value;
    let input = document.getElementById('task-input');
    let btn = document.getElementById('add-task-button');

    if (btn) {
        //@ts-ignore
        btn.disabled = true;
        btn?.classList.remove('btn-active');
    }

    if (input) {
        //@ts-ignore
        input.value = '';
    }
});

document.body.addEventListener('filterTodos', (event) => {
    // @ts-ignore
    let filter = event.detail.value;
    const isAll = filter === 'all';

    for (const elmt of document.getElementsByClassName('not-completed')) {
        //@ts-ignore
        elmt.style.display = isAll ? 'flex' : 'none';
    }

    if (isAll) {
        document.getElementById('filter-all')?.classList.add('active');
        document.getElementById('filter-completed')?.classList.remove('active');
    } else {
        document.getElementById('filter-all')?.classList.remove('active');
        document.getElementById('filter-completed')?.classList.add('active');
    }
});

document.body.addEventListener('startTodoEditing', (event) => {

    // @ts-ignore
    let {id, label} = event.detail;

    const updateBloc = document.getElementById('update-todo-bloc')

    if (updateBloc) {

        const editBloc = document.getElementById('edit-todo-bloc')

        if (editBloc) {
            editBloc.classList.remove('visible');
            editBloc.classList.add('invisible');
        }

        updateBloc.classList.remove('invisible');
        updateBloc.classList.add('visible');

        let btns = document.getElementsByClassName('btn-edit');

        for (let i = 0; i < btns.length; i++) {
            let btn = btns[i];
            //@ts-ignore
            btn.disabled = true;
            btn.classList.remove('btn-active');
        }

        setTimeout(() => {
            let input = document.getElementById('update-task-input');

            let btn = document.getElementById('update-task-button');

            if (input) {
                //@ts-ignore
                input.value = label;
            }

            if (btn) {
                // @ts-ignore
                btn.disabled = true;
                btn.classList.remove('btn-active');
            }

        }, 50)


        const delBtn = document.getElementById(`delete-todo-button_${id}`);
        const checkBtn = document.getElementById(`check-todo-button_${id}`);

        if (delBtn) {
            delBtn.classList.remove('btn-active');
            // @ts-ignore
            delBtn.disabled = true;
        }
        if (checkBtn) {
            checkBtn.classList.remove('btn-active');
            // @ts-ignore
            checkBtn.disabled = true;
        }

    }

});

document.body.addEventListener('todoUpdated', (_) => {

    const editBloc = document.getElementById('edit-todo-bloc')

    if (editBloc) {

        const updateBloc = document.getElementById('update-todo-bloc')

        if (updateBloc) {
            let input = document.getElementById('update- task-input');

            if (input) {
                //@ts-ignore
                input.value = '';
            }

            let btn = document.getElementById('update-task-button');
            if (btn) {
                // @ts-ignore
                btn.disabled = true;
                btn.classList.remove('btn-active');
            }

            updateBloc.classList.add('invisible');
            updateBloc.classList.remove('visible');
        }

        editBloc.classList.remove('invisible');
        editBloc.classList.add('visible');


        let btns = document.getElementsByClassName('btn-edit');
        for (let i = 0; i < btns.length; i++) {
            let btn = btns[i];
            //@ts-ignore
            btn.disabled = false;
            btn.classList.add('btn-active');
        }

    }

});