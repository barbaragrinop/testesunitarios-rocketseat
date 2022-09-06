import { getByPlaceholderText, queryByText, render, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import List from "./List"


describe('App Component', () => {
    it('should render list items', async () => {
        const { getByText, queryByText, rerender } = render(<List initialItems={['Barbara', 'Thaina', 'Millena', 'Victor']} />)

        expect(getByText("Barbara")).toBeInTheDocument()
        expect(getByText("Thaina")).toBeInTheDocument()
        expect(getByText("Victor")).toBeInTheDocument()

        rerender(<List initialItems={['Helena', 'Joanna', 'Valentina']} />)

        await waitFor(() => {
            expect(getByText('Joanna')).toBeInTheDocument()
        })


    })

    it('should be able to add items to the list', async () => {
        const { getByText, getByPlaceholderText, findByText, debug } = render(<List initialItems={[]} />)

        const inputElement = getByPlaceholderText('Novo item')
        const addButton = getByText('Adicionar')

        await userEvent.type(inputElement, 'Novo')
        await userEvent.click(addButton)

        //1

        expect(await findByText('Novo')).toBeInTheDocument()

        //OU

        //2
        // await waitFor(() => {
        //     expect(getByText('Novo')).toBeInTheDocument()
        // })

    })

    it('should be able to remove items from the list', async () => {
        const { getByText, getAllByText, findByText, queryByText } = render(<List initialItems={['Barbara']} />)
        const addButton = getByText('Adicionar')
        const removeButtons = getAllByText('Remover')

        userEvent.click(removeButtons[0])

        // await waitForElementToBeRemoved(() => {
        //     return getByText('Barbara')
        // })

        //OU

        await waitFor(() => {
            expect(queryByText('Barbara')).not.toBeInTheDocument()
        })
    })

})