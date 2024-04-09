export interface ComponentDetails {
    name: string,
    path?: string
}

export const component = async (details: ComponentDetails, children: JSX.Element) => {

    let path = details.path ? `&path=${details.path}` : '';

    return (
        <>
            <link rel="stylesheet" href={`/styles/component?name=${details.name}${path}`}/>
            {children}
        </>
    )
}