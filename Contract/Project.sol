
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalInsurance {
    address public insurer;
    
    enum ClaimStatus { Pending, Approved, Rejected, Paid }
    
    struct Claim {
        uint256 id;
        address patient;
        uint256 amount;
        string diagnosis;
        ClaimStatus status;
    }
    
    mapping(uint256 => Claim) public claims;
    uint256 public claimCounter;
    
    event ClaimFiled(uint256 id, address indexed patient, uint256 amount, string diagnosis);
    event ClaimUpdated(uint256 id, ClaimStatus status);
    
    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can perform this action");
        _;
    }
    
    constructor() {
        insurer = msg.sender;
    }
    
    function fileClaim(uint256 _amount, string memory _diagnosis) public {
        claimCounter++;
        claims[claimCounter] = Claim(claimCounter, msg.sender, _amount, _diagnosis, ClaimStatus.Pending);
        emit ClaimFiled(claimCounter, msg.sender, _amount, _diagnosis);
    }
    
    function updateClaimStatus(uint256 _claimId, ClaimStatus _status) public onlyInsurer {
        require(claims[_claimId].id != 0, "Claim does not exist");
        claims[_claimId].status = _status;
        emit ClaimUpdated(_claimId, _status);
    }
    
    function getClaim(uint256 _claimId) public view returns (Claim memory) {
        return claims[_claimId];
    }
}
