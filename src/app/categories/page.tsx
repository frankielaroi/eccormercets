import React from 'react'
import Header from '../header'
import Item from './items'
import Footer  from '../footer'

export default function Category() {
    return (
        <>
            <Header item={undefined}></Header>
            <Item></Item>
            <Footer></Footer>
        </>
    )
    
}