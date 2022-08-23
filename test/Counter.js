const { expect } = require('chai');
const { ethers } = require('hardhat');
const { TASK_COMPILE_SOLIDITY_LOG_RUN_COMPILER_START } = require('hardhat/builtin-tasks/task-names');
describe('Counter', () => {
    let counter

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter', 1)
    })

    describe('deployment', () => {
    
        it('sets the initial count', async () => { 
        expect(await counter.count()).to.equal(1)
    })     

     it('sets initial name', async () => {
        expect(await counter.name()).to.equal('My Counter')
    })      
})

describe('Counting', () => {
    let transaction

    it('reads the count from the "count" public variable', async () => {
        expect(await counter.count()).to.equal(1)
    })
    it('reads the count from the "getCount()" function', async () => {
        expect(await counter.getCount()).to.equal(1) 
    })

    it('increment the count', async () => {
    let transaction = await counter.increment()
    await transaction.wait()

    expect(await counter.count()).to.equal(2)

    transaction = await counter.increment()
    await transaction.wait()
    expect(await counter.count()).to.equal(3)
    })
    it('decrements the count', async () => {
        let transaction = await counter.decrement()
        await transaction.wait()
    
        expect(await counter.count()).to.equal(0)
        await expect(counter.decrement()).to.be.reverted
    })
    it('reads the name from the "count" public variable', async () => {
        expect(await counter.name()).to.equal('My Counter')
    })
    it('reads the count from the "getName()" function', async () => {
        expect(await counter.getName()).to.equal('My Counter') 
    })
    it('updates the name', async () => {
        transaction = await counter.setName('New Name')
        await transaction.wait()
        expect(await counter.name()).to.equal('New Name')
    })
  })
})