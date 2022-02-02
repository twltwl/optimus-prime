const path = require('path')
const fs = require('fs')

const main = ([_, __, input]) => {
  if (!input) {
    console.log('Please specify a file!')

    return
  }

  const p = path.resolve(process.cwd(), input)

  try {
    // should be fine with files less than 1GB
    const file = fs.readFileSync(p, { encoding: 'utf8' })

    const usedNumbers = []

    const cleanFile = toArr(file).reduce((acc, curr) => {
      const asInt = parseInt(curr)
      const validNumber = !isNaN(asInt)

      // remove crap
      if (!validNumber || asInt < 1 || usedNumbers.includes(asInt)) {
        return acc
      }

      usedNumbers.push(asInt)

      return [...acc, asInt]
    }, [])

    // show final result
    cleanFile.map((n) => console.log(`${n} prime? -> ${isPrime(n)} `))
  } catch (e) {
    console.log(e)
  }
}

const toArr = (fileContents) => fileContents.split(/\n/)

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return num > 1
}

main(process.argv)
