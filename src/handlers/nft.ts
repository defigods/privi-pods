import { log } from '@graphprotocol/graph-ts'
import { ERC721 } from '../entities/templates/PRIVIPodERC721Token/ERC721'
import { Transfer } from '../entities/templates/PRIVIPodERC721Token/ERC721'


export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == '0x0000000000000000000000000000000000000000'
}

export function getNFTId(contractAddress: string, podId: string): string {
  return contractAddress + '-' + podId
}

export function getTokenURI(event: Transfer): string {
  let erc721 = ERC721.bind(event.address)
  let tokenURICallResult = erc721.try_tokenURI(event.params.tokenId)

  let tokenURI = ''

  if (tokenURICallResult.reverted) {
    log.warning('tokenURI reverted for tokenID: {} contract: {}', [
      event.params.tokenId.toString(),
      event.address.toHexString()
    ])
  } else {
    tokenURI = tokenURICallResult.value
  }

  return tokenURI
}
