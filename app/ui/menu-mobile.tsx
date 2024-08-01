'use client'

import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { List } from '@phosphor-icons/react'
import Navbar from '@/app/ui/navbar'
import ProfileOptions from '@/app/ui/profile-options'

const MenuMobile = (): React.JSX.Element => {
  const [show, setShow] = useState(false)

  const handleClose = (): void => {
    setShow(false)
  }
  const handleShow = (): void => {
    setShow(true)
  }

  const onLinkClick = (): void => {
    setShow(false)
  }

  return (
    <div className="block lg:hidden">
      <Button className="bg-base-blue border-base-blue" onClick={handleShow}>
        <List size={32} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="relative flex flex-col items-center justify-between">
          <Navbar isMobile={true} onLinkClicked={onLinkClick} />
          <ProfileOptions onLinkClicked={onLinkClick} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default MenuMobile
