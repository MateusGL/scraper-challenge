import * as Yup from 'yup'

const schema = Yup.object().shape({
    "model": Yup.mixed().oneOf(['Lenovo']).required(),
})

export default function incoming(params: any) {
    schema.validateSync(params)
    return params
}