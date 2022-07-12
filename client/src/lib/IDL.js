export const IDL = {
  version: "0.1.0",
  name: "anchor_escrow",
  instructions: [
    {
      name: "init",
      accounts: [
        {
          name: "escrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "escrowAccountBump",
          type: "u8",
        },
      ],
    },
    {
      name: "stake",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: true,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userEscrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "cancel",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: true,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userEscrowAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "stakeIndex",
          type: "u64",
        },
      ],
    },
    {
      name: "modify",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: true,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userEscrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "release",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: true,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userEscrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "releaseAmount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "EscrowAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "index",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "VaultAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UserEscrowAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "index",
            type: "u64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "staker",
            type: "publicKey",
          },
          {
            name: "stakeTime",
            type: "u64",
          },
        ],
      },
    },
  ],
};
