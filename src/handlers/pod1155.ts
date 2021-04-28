import { TransferSingle, TransferBatch } from '../entities/templates/PRIVIPodERC1155Token/ERC1155'
import { PodCreated } from '../entities/PRIVIPodERC1155Factory/PRIVIPodERC1155Factory'
import { PRIVIPod1155, NFT } from '../entities/schema'
import { getNFTId } from './nft'
import { createAccount } from './wallet'

export function handleTransferSingle(event: TransferSingle): void {
  if (event.params.id.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.id.toString())

  let nft = new NFT(id)

  nft.tokenId = event.params.id
  nft.account = event.params.to.toString()
  createAccount(event.params.to)

  nft.save()
}

export function handleTransferBatch(event: TransferBatch): void {
  if (event.params.ids.length == 0) {
    return
  }

  event.params.ids.forEach(idNumber => {
    let id = getNFTId(event.address.toHexString(), idNumber.toString())
  
    let nft = new NFT(id)
  
    nft.tokenId = idNumber
    nft.account = event.params.to.toString()
    createAccount(event.params.to)
  
    nft.save()
  })
}

export function handlePodCreated(event: PodCreated): void {
  if (event.params.uri.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.uri.toString())

  let pod = new PRIVIPod1155(id)

  pod.address = event.address
  pod.uri = event.params.uri.toString()

  pod.save()
}
