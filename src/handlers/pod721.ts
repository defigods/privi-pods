import { Transfer } from '../entities/templates/PRIVIPodERC721Token/ERC721'
import { PodCreated } from '../entities/PRIVIPodERC721Factory/PRIVIPodERC721Factory'
import { PRIVIPod721, NFT } from '../entities/schema'
import { getNFTId, getTokenURI } from './nft'
import { createAccount } from './wallet'

export function handleTransfer(event: Transfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.tokenId.toString())

  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.tokenURI = getTokenURI(event)
  nft.account = event.params.to.toString()
  createAccount(event.params.to)

  nft.save()
}

export function handlePodCreated(event: PodCreated): void {
  if (event.params.podId.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.podId.toString())

  let pod = new PRIVIPod721(id)

  pod.address = event.address
  pod.podId = event.params.podId.toString()
  pod.name = event.params.podTokenName
  pod.symbol = event.params.podTokenSymbol

  pod.save()
}
