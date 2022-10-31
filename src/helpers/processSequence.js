/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import * as R from "ramda"
import Api from '../tools/api';


const api = new Api();

// getters
const getLength = R.length
const getNumber = str => Number(str)
const formatDataForFetch = (value) => ({ from: 10, to: 2, number: value })
const getInteger = Math.round
const getResult = R.prop(['result'])
const getPow2 = R.partialRight(Math.pow, [2])
const getMod3 = val => val % 3
const fetchBinary = api.get('https://api.tech/numbers/base')
const fetchAnimal = async (id) => await api.get(`https://animals.tech/${id}`, {})

// predicates
const isLengthLessThan10 = R.pipe(getLength, R.gt(10))
const isLengthGreaterThan2 = R.pipe(getLength, R.lt(2))
const isValueGreaterThan0 = R.pipe(getNumber, R.lt(0))
const isValidValue = R.allPass([isLengthLessThan10, isLengthGreaterThan2, isValueGreaterThan0])
const isNotValidValue = R.complement(isValidValue)

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    R.compose(
        R.cond([
            [isValidValue, R.compose(
                R.andThen(
                    R.compose(
                        R.andThen(
                            R.compose(
                                handleSuccess,
                                getResult
                            )
                        ),
                        fetchAnimal,
                        R.tap(writeLog),
                        getMod3,
                        R.tap(writeLog),
                        getPow2,
                        R.tap(writeLog),
                        getLength,
                        R.tap(writeLog),
                        getResult
                    )
                ),
                fetchBinary,
                formatDataForFetch,
                R.tap(writeLog),
                getInteger,
            )],
            [isNotValidValue, handleError],
        ]),
        R.tap(writeLog),
    )(value)
}

export default processSequence;
