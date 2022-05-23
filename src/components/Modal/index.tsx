import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircle } from 'phosphor-react'
import create from 'zustand'
import roomStore from '../../utils/roomStore'
import { useParams, useNavigate } from 'react-router-dom'
import { RoomParams } from '../../utils/roomParams'

interface IModalProps {
  isOpen: boolean
  toggle: () => void
}
export const modalStore = create<IModalProps>((set, get) => ({
  isOpen: false,
  toggle: () => {
    set({
      isOpen: !get().isOpen
    })
  }
}))

export function Modal() {
  const { isOpen, toggle } = modalStore()
  const { deleteRoom } = roomStore()
  const navigate = useNavigate()
  const params = useParams<RoomParams>()
  const roomID = params.id

  async function handleDeleteRoom() {
    toggle()
    await deleteRoom(roomID as string)
    navigate('/', { replace: true })
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          toggle()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="overflow-y-auto fixed inset-0">
          <div className="flex justify-center items-center p-4 min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex overflow-hidden flex-col gap-4 justify-center items-center p-6 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all">
                <XCircle weight="bold" className="w-12 h-12 text-my-danger" />

                <h3 className="font-pop text-2xl font-bold text-my-black">
                  Encerrar sala
                </h3>

                <p className="font-rob text-sm text-my-gray-dark">
                  Tem certeza que você deseja encerrar esta sala?
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex justify-center items-center py-2 px-8 h-[48px] font-rob font-medium text-my-gray-light bg-my-gray-dark hover:bg-my-gray-medium rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-my-hover-danger focus-visible:ring-offset-2 transition duration-200"
                    onClick={toggle}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center py-2 px-8 h-[48px] font-rob font-medium text-white bg-my-danger hover:bg-my-hover-danger rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-my-hover-danger focus-visible:ring-offset-2 transition duration-200"
                    onClick={handleDeleteRoom}
                  >
                    Sim, encerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
