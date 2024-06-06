'use client'
import React from 'react'
import Header from '../header'
import Item from './items'
import Footer from '../footer'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function Category() {
    return (
    <Provider store={store}>
        <div className='bg-white'>
            <Header item={undefined}></Header>
            <Item></Item>
            <Footer></Footer>
            </div>
            </Provider>
    )
    
}