/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import * as R from "ramda"

// predicates
const isObjectEqToColor = (obj, color) => R.propEq(obj, color)
const isStar = R.partial(isObjectEqToColor, ['star'])
const isSquare = R.partial(isObjectEqToColor, ['square'])
const isTriangle = R.partial(isObjectEqToColor, ['triangle'])
const isCircle = R.partial(isObjectEqToColor, ['circle'])
const isGreen = R.equals('green')
const isRed = R.equals('red')
const isBlue = R.equals('blue')
const isOrange = R.equals('orange')

// getters
const getTriangle = R.prop('triangle')
const getSquare = R.prop('square')
const getGreens = R.filter(isGreen)
const getBlues = R.filter(isBlue)
const getReds = R.filter(isRed)
const getOranges = R.filter(isOrange)
const getLen = (items) => R.values(items).length

// count
const greensLen = R.pipe(getGreens, getLen)
const redsLen = R.pipe(getReds, getLen)
const bluesLen = R.pipe(getBlues, getLen)
const orangesLen = R.pipe(getOranges, getLen)


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = R.allPass([isStar('red'), isSquare('green'), isTriangle('white'), isCircle('white')])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = R.pipe(greensLen, R.lte(2))

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = R.converge(R.equals, [bluesLen, redsLen])

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = R.allPass([isCircle('blue'), isStar('red'), isSquare('orange'),])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = R.anyPass(
    [
        R.pipe(redsLen, R.lte(3)),
        R.pipe(bluesLen, R.lte(3)),
        R.pipe(greensLen, R.lte(3)),
        R.pipe(orangesLen, R.lte(3)),
    ]
)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = R.allPass(
    [
        R.pipe(greensLen, R.equals(2)),
        R.pipe(redsLen, R.equals(1)),
        isTriangle('green'),
    ]
)

// 7. Все фигуры оранжевые.
export const validateFieldN7 = R.allPass([isStar('orange'), isSquare('orange'), isTriangle('orange'), isCircle('orange')])

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = R.allPass([R.pipe(isStar('red'), R.not), R.pipe(isStar('white'), R.not)])

// 9. Все фигуры зеленые.
export const validateFieldN9 = R.pipe(greensLen, R.equals(4))

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = R.allPass(
    [
        R.converge(R.equals, [getTriangle, getSquare]),
        R.pipe(isTriangle('white'), R.not),
    ]
)
